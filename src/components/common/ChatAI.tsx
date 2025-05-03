import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner, faRobot, faImage, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { generateChatCompletion, generateImageWithDalle, ChatMessage } from '../../services/openaiService';

interface ChatAIProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatAIContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: ${({ isOpen }) => (isOpen ? '0' : '-600px')};
  right: 20px;
  width: 350px;
  height: 500px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  transition: bottom 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
  
  @media (max-width: 576px) {
    width: 100%;
    right: 0;
    border-radius: 12px 12px 0 0;
  }
`;

const ChatHeader = styled.div`
  padding: 15px;
  background: ${({ theme }) => theme.gradientBlue};
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div<{ isUser: boolean }>`
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  max-width: 80%;
  padding: 10px 15px;
  border-radius: ${({ isUser }) => (isUser ? '18px 18px 0 18px' : '18px 18px 18px 0')};
  background: ${({ theme, isUser }) => (isUser ? theme.primary : theme.backgroundAlt)};
  color: ${({ theme, isUser }) => (isUser ? 'white' : theme.text)};
  margin-bottom: 5px;
  word-wrap: break-word;
`;

const ImageMessage = styled.div`
  align-self: flex-start;
  max-width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 10px;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const InputArea = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.backgroundAlt};
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  outline: none;
  
  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary};
  }
`;

const SendButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
  
  &:disabled {
    background: ${({ theme }) => theme.border};
    cursor: not-allowed;
  }
`;

const OptionButtons = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 10px 10px;
`;

const OptionButton = styled.button`
  background: ${({ theme }) => theme.backgroundAlt};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 5px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.primary};
  }
  
  svg {
    font-size: 0.8rem;
  }
`;

const LoadingSpinner = styled(FontAwesomeIcon)`
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const WelcomeMessage = styled.div`
  font-style: italic;
  color: ${({ theme }) => theme.textLight};
  text-align: center;
  margin: 10px 0;
`;

const ChatAI: React.FC<ChatAIProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: 'You are a helpful assistant for Modern Web Creations, a web development agency. Be concise and helpful.' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isImageMode, setIsImageMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      if (isImageMode) {
        // Generate image
        const imageUrl = await generateImageWithDalle(`${input}. Create a professional, modern web design style image.`);
        
        if (imageUrl) {
          setMessages(prev => [
            ...prev, 
            { role: 'assistant', content: `Here's the image I generated based on: "${input}"` },
            { role: 'assistant', content: `![Generated Image](${imageUrl})` }
          ]);
        } else {
          setMessages(prev => [
            ...prev, 
            { role: 'assistant', content: 'Sorry, I could not generate that image. Please try a different description.' }
          ]);
        }
        
        // Switch back to chat mode
        setIsImageMode(false);
      } else {
        // Regular chat completion
        const response = await generateChatCompletion([
          ...messages,
          userMessage
        ]);
        
        setMessages(prev => [
          ...prev, 
          { role: 'assistant', content: response }
        ]);
      }
    } catch (error) {
      console.error('Error in AI response:', error);
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const toggleImageMode = () => {
    setIsImageMode(!isImageMode);
    if (!isImageMode) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Image generation mode activated. Describe the image you want me to create.' }
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Chat mode restored. How can I help you?' }
      ]);
    }
  };
  
  // Function to render message content (handles both text and Markdown images)
  const renderMessageContent = (content: string) => {
    // Check if content contains Markdown image syntax
    const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
    if (imageMatch && imageMatch[1]) {
      return (
        <ImageMessage>
          <img src={imageMatch[1]} alt="AI Generated" loading="lazy" />
        </ImageMessage>
      );
    }
    
    // Regular text message
    return content;
  };
  
  return (
    <ChatAIContainer isOpen={isOpen}>
      <ChatHeader>
        <div>
          <FontAwesomeIcon icon={faRobot} /> Modern Web AI Assistant
        </div>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </CloseButton>
      </ChatHeader>
      <ChatMessages>
        {messages.filter(msg => msg.role !== 'system').length === 0 && (
          <WelcomeMessage>
            Hello! I'm your AI assistant. How can I help you with your web development questions?
          </WelcomeMessage>
        )}
        
        {messages.map((msg, index) => {
          if (msg.role === 'system') return null;
          
          return (
            <Message key={index} isUser={msg.role === 'user'}>
              {renderMessageContent(msg.content)}
            </Message>
          );
        })}
        
        {isLoading && (
          <Message isUser={false}>
            <LoadingSpinner icon={faSpinner} /> Thinking...
          </Message>
        )}
        <div ref={messagesEndRef} />
      </ChatMessages>
      <OptionButtons>
        <OptionButton onClick={toggleImageMode}>
          <FontAwesomeIcon icon={faImage} />
          {isImageMode ? 'Switch to Chat' : 'Generate Image'}
        </OptionButton>
      </OptionButtons>
      <InputArea>
        <Input
          type="text"
          placeholder={isImageMode ? "Describe the image you want..." : "Type a message..."}
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <SendButton onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
          {isLoading ? <LoadingSpinner icon={faSpinner} /> : <FontAwesomeIcon icon={faPaperPlane} />}
        </SendButton>
      </InputArea>
    </ChatAIContainer>
  );
};

export default ChatAI; 