import React, { useState, useRef, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRobot, 
  faPaperPlane, 
  faTimes, 
  faEnvelope, 
  faMobile, 
  faAngleDown, 
  faMicrophone,
  faSpinner,
  faBrain,
  faBolt,
  faImage
} from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../context/ThemeContext';
import { generateChatCompletion, generateImageWithDalle } from '../../services/openaiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isImage?: boolean;
}

interface ChatWidgetProps {
  ownerEmail?: string;
  ownerPhone?: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hi there! 👋 I\'m Yaro, your AI assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date()
  }
];

// ChatWidget Container
const WidgetContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
`;

// Chat Button
const ChatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: ${({ theme }) => theme.gradient};
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  align-self: flex-end;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  }
`;

// Chat Panel
const ChatPanel = styled(motion.div)`
  width: 350px;
  height: 500px;
  border-radius: 15px;
  background: ${({ theme }) => theme.background};
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
`;

// Logo Container
const LogoContainer = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${({ theme }) => theme.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

// Animated Circle Background
const PulsatingCircle = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${({ theme }) => theme.secondary};
  z-index: 0;
`;

// Brain Icon
const BrainIcon = styled(FontAwesomeIcon)`
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.textDark};
  margin-right: -2px;
`;

// Lightning Bolt
const BoltIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 10px;
  right: 8px;
  z-index: 2;
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.7));
`;

// Chat Header
const ChatHeader = styled.div`
  padding: 15px;
  background: ${({ theme }) => theme.gradient};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  
  small {
    opacity: 0.9;
    font-weight: 500;
    letter-spacing: 0.3px;
  }
`;

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  opacity: 0.8;
  transition: opacity 0.2s;
  margin-left: 5px;
  
  &:hover {
    opacity: 1;
  }
`;

// Chat Messages
const ChatMessages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${({ theme }) => theme.backgroundAlt};
`;

const MessageBubble = styled.div<{ sender: 'user' | 'bot' }>`
  max-width: 80%;
  padding: 12px 15px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
  
  ${({ sender, theme }) =>
    sender === 'user'
      ? css`
          align-self: flex-end;
          background: ${theme.primary};
          color: white;
          border-bottom-right-radius: 4px;
        `
      : css`
          align-self: flex-start;
          background: ${theme.cardBackground};
          color: ${theme.text};
          border-bottom-left-radius: 4px;
          border: 1px solid ${theme.border};
        `}
`;

const Timestamp = styled.small`
  font-size: 10px;
  color: ${({ theme }) => theme.textLight};
  display: block;
  margin-top: 5px;
  opacity: 0.7;
`;

// Contact Options
const ContactOptions = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
  border-top: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.cardBackground};
`;

const ContactButton = styled.button`
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  
  &:nth-child(1) {
    background: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.textDark};
    
    &:hover {
      background: ${({ theme }) => theme.secondaryHover};
    }
  }
  
  &:nth-child(2) {
    background: ${({ theme }) => theme.primary};
    color: white;
    
    &:hover {
      background: ${({ theme }) => theme.primaryHover};
    }
  }
  
  &:nth-child(3) {
    background: ${({ theme }) => theme.accent || theme.primary};
    color: white;
    
    &:hover {
      background: ${({ theme }) => theme.primaryHover};
    }
  }
`;

// Chat Input
const ChatInput = styled.div`
  padding: 15px;
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  gap: 10px;
  background: ${({ theme }) => theme.cardBackground};
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.primary}20`};
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: ${({ theme }) => theme.border};
    cursor: not-allowed;
    transform: none;
  }
`;

const VoiceButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textDark};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.secondaryHover};
    transform: translateY(-2px);
  }
`;

// Options Menu
const OptionsButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

const OptionsMenu = styled(motion.div)`
  position: absolute;
  top: 60px;
  right: 15px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  border: 1px solid ${({ theme }) => theme.border};
  z-index: 10;
  overflow: hidden;
`;

const OptionItem = styled.button`
  padding: 12px 15px;
  width: 220px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  transition: all 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.backgroundAlt};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
`;

// Animation variants
const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  },
  tap: {
    scale: 0.95
  }
};

const panelVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

const pulseVariants = {
  initial: { scale: 0.85, opacity: 0.6 },
  animate: { 
    scale: [0.85, 1.05, 0.85],
    opacity: [0.6, 0.8, 0.6],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const ChatWidget: React.FC<ChatWidgetProps> = ({ 
  ownerEmail = "contact@modernwebcreations.com", 
  ownerPhone = "+17276233424" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [isImageMode, setIsImageMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useContext(ThemeContext);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Toggle chat panel
  const toggleChat = () => {
    setIsOpen(!isOpen);
    setOptionsOpen(false);
  };

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || isTyping) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    try {
      if (isImageMode) {
        // Using OpenAI to generate image
        const imagePrompt = `${newMessage}. Create a professional, modern web design style image.`;
        
        // Add loading message
        const loadingMessage: Message = {
          id: 'loading',
          text: 'Generating image... This may take a moment.',
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, loadingMessage]);
        
        // Generate image with DALL-E
        const imageUrl = await generateImageWithDalle(imagePrompt);
        
        // Remove loading message and add image response
        setMessages(prev => {
          const filtered = prev.filter(msg => msg.id !== 'loading');
          return [
            ...filtered,
            {
              id: (Date.now() + 1).toString(),
              text: `![Generated Image](${imageUrl})`,
              sender: 'bot',
              timestamp: new Date(),
              isImage: true
            }
          ];
        });
        
        // Switch back to chat mode
        setIsImageMode(false);
      } else {
        // Using OpenAI for chat completion
        const response = await generateChatCompletion([
          { 
            role: 'system', 
            content: 'You are Yaro, an AI assistant for Modern Web Creations, a web development agency. Be helpful, concise, and professional.' 
          },
          ...messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
            content: msg.text
          })),
          { role: 'user', content: newMessage }
        ]);
        
        // Add AI response
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: response,
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
      }
    } catch (error) {
      console.error('Error in AI response:', error);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: 'Sorry, I encountered an error. Please try again later.',
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle email contact
  const handleEmailContact = () => {
    window.location.href = `mailto:${ownerEmail}?subject=Inquiry from Website Chat with Yaro`;
  };

  // Handle text contact
  const handleTextContact = () => {
    window.location.href = `sms:${ownerPhone}?body=Hello, I'm contacting from your website after chatting with Yaro.`;
  };
  
  // Toggle image mode
  const toggleImageMode = () => {
    setIsImageMode(!isImageMode);
    if (!isImageMode) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'Image generation mode activated. Describe the image you want me to create.',
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'Chat mode restored. How can I help you?',
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  };

  // Function to render message content (handles both text and images)
  const renderMessageContent = (message: Message) => {
    // Check if content contains image URL
    const imageMatch = message.text.match(/!\[.*?\]\((.*?)\)/);
    if (message.isImage && imageMatch && imageMatch[1]) {
      return (
        <MessageImage src={imageMatch[1]} alt="AI Generated" loading="lazy" />
      );
    }
    
    // Regular text message
    return message.text;
  };
  
  // Custom Yaro Logo
  const YaroLogo = () => (
    <LogoContainer>
      <PulsatingCircle 
        variants={pulseVariants}
        initial="initial"
        animate="animate"
      />
      <BrainIcon icon={faBrain} size="lg" />
      <BoltIcon icon={faBolt} />
    </LogoContainer>
  );

  return (
    <WidgetContainer>
      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
          >
            <ChatHeader>
              <HeaderTitle>
                <HeaderIcon>
                  <YaroLogo />
                </HeaderIcon>
                <div>
                  <h3>Yaro</h3>
                  <small>{isTyping ? 'Thinking...' : 'Ready to help'}</small>
                </div>
              </HeaderTitle>
              <div>
                <OptionsButton onClick={() => setOptionsOpen(!optionsOpen)}>
                  <FontAwesomeIcon icon={faAngleDown} />
                </OptionsButton>
                <CloseButton onClick={toggleChat}>
                  <FontAwesomeIcon icon={faTimes} />
                </CloseButton>
              </div>
            </ChatHeader>

            <AnimatePresence>
              {optionsOpen && (
                <OptionsMenu
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <OptionItem onClick={() => {
                    setMessages(initialMessages);
                    setOptionsOpen(false);
                  }}>
                    <FontAwesomeIcon icon={faTimes} />
                    Clear conversation
                  </OptionItem>
                  <OptionItem onClick={toggleImageMode}>
                    <FontAwesomeIcon icon={faImage} />
                    {isImageMode ? 'Switch to Chat' : 'Generate Image'}
                  </OptionItem>
                  <OptionItem onClick={handleEmailContact}>
                    <FontAwesomeIcon icon={faEnvelope} />
                    Email us directly
                  </OptionItem>
                  <OptionItem onClick={handleTextContact}>
                    <FontAwesomeIcon icon={faMobile} />
                    Text us directly
                  </OptionItem>
                </OptionsMenu>
              )}
            </AnimatePresence>

            <ChatMessages>
              {messages.map(message => (
                <MessageBubble key={message.id} sender={message.sender}>
                  {renderMessageContent(message)}
                  <Timestamp>{formatTime(message.timestamp)}</Timestamp>
                </MessageBubble>
              ))}
              {isTyping && (
                <MessageBubble sender="bot">
                  <FontAwesomeIcon icon={faSpinner} spin /> Thinking...
                </MessageBubble>
              )}
              <div ref={messagesEndRef} />
            </ChatMessages>

            <ContactOptions>
              <ContactButton onClick={handleEmailContact}>
                <FontAwesomeIcon icon={faEnvelope} />
                Email Us
              </ContactButton>
              <ContactButton onClick={handleTextContact}>
                <FontAwesomeIcon icon={faMobile} />
                Text Us
              </ContactButton>
              <ContactButton onClick={toggleImageMode}>
                <FontAwesomeIcon icon={faImage} />
                {isImageMode ? 'Chat' : 'Image'}
              </ContactButton>
            </ContactOptions>

            <ChatInput>
              <MessageInput
                placeholder={isImageMode ? "Describe the image you want..." : "Ask Yaro anything..."}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <VoiceButton title="Voice input (demo only)">
                <FontAwesomeIcon icon={faMicrophone} />
              </VoiceButton>
              <SendButton 
                onClick={sendMessage} 
                disabled={isTyping || !newMessage.trim()}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </SendButton>
            </ChatInput>
          </ChatPanel>
        )}
      </AnimatePresence>

      <ChatButton
        onClick={toggleChat}
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <FontAwesomeIcon icon={faRobot} />
      </ChatButton>
    </WidgetContainer>
  );
};

// Add styled component for images
const MessageImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-top: 5px;
`;

export default ChatWidget; 