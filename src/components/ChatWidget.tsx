import { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '../contexts/ChatContext';

const API_URL = import.meta.env.VITE_VA_API_URL || 'https://va.vedicvn.sbs';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface QuickReply {
  id: string;
  label: string;
  value: string;
}

interface PaymentInfo {
  paymentCode: string;
  amount: number;
  qrUrl?: string;
  bankAccount?: string;
  bankName?: string;
  instructions?: string;
}

const QUICK_REPLIES: QuickReply[] = [
  { id: 'courses', label: '📚 Khóa học chiêm tinh', value: 'Tôi muốn tư vấn khóa học chiêm tinh Vệ Đà' },
  { id: 'services', label: '⭐ Dịch vụ luận giải', value: 'Tôi muốn biết thêm về dịch vụ luận giải' },
  { id: 'booking', label: '📅 Đặt lịch tư vấn', value: 'Tôi muốn đặt lịch tư vấn với chuyên gia' },
  { id: 'price', label: '💰 Hỏi học phí', value: 'Cho tôi biết học phí các khóa học' },
  { id: 'schedule', label: '📆 Lịch khai giảng', value: 'Khi nào có lớp mới khai giảng?' },
];

function formatTime(date: Date): string {
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

export function ChatWidget() {
  const { isOpen, pendingMessage, closeChat, openChat } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInitializedRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Initialize greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0 && !hasInitializedRef.current) {
      hasInitializedRef.current = true;
      const greeting: Message = {
        id: 'greeting',
        role: 'assistant',
        content: 'Xin chào! Mình là Carmen, trợ lý ảo của Votive Academy 🌟\n\nMình có thể giúp bạn:\n• Tư vấn khóa học chiêm tinh Vệ Đà\n• Giới thiệu dịch vụ luận giải\n• Đặt lịch với chuyên gia Trâm Phạm\n• Trả lời thắc mắc về học phí và lịch khai giảng\n\nBạn cần hỗ trợ gì hôm nay?',
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
    
    // Reset khi đóng chat
    if (!isOpen) {
      hasInitializedRef.current = false;
    }
  }, [isOpen]);

  // Auto-send pending message
  useEffect(() => {
    if (pendingMessage && isOpen) {
      const timer = setTimeout(() => {
        sendMessage(pendingMessage);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pendingMessage, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const messageText = (text ?? input).trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const body: Record<string, string | null> = {
        message: messageText,
        session_id: sessionId,
        source: 'landing_page',
      };

      const resp = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        throw new Error(`HTTP ${resp.status}: ${errorText || resp.statusText}`);
      }

      const data = await resp.json();

      setSessionId(data.session_id ?? sessionId);

      // Capture payment info if exists
      if (data.payment_info) {
        setPaymentInfo(data.payment_info);
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Cảm ơn bạn đã tin tưởng Votive Academy!',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Xin lỗi, mình đang gặp sự cố kết nối. Bạn vui lòng thử lại sau, hoặc liên hệ trực tiếp qua hotline 0385 448 747 nhé! 🙏',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickReply = (reply: QuickReply) => {
    setInput('');
    sendMessage(reply.value);
  };

  const handleOpenQR = () => {
    if (paymentInfo?.qrUrl) {
      window.open(paymentInfo.qrUrl, '_blank');
    }
  };

  const handleCopyCode = () => {
    if (paymentInfo?.paymentCode) {
      navigator.clipboard.writeText(paymentInfo.paymentCode);
    }
  };

  const showQuickReplies = messages.length <= 1 && !isTyping && !isLoading;

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={() => isOpen ? closeChat() : openChat()}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-105 active:scale-95"
        aria-label={isOpen ? 'Đóng chat' : 'Mở chat hỗ trợ'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <span className="text-2xl">🪐</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] h-[620px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200">
          {/* Header */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 text-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="text-3xl">🪐</span>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-amber-500 rounded-full" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Carmen</h3>
                <p className="text-amber-100 text-xs mt-0.5">Trợ lý ảo Votive Academy</p>
                <p className="text-amber-200 text-[10px] mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Đang hoạt động
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-stone-50/50 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-br-md'
                      : 'bg-white text-stone-700 shadow-sm rounded-bl-md border border-stone-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p
                    className={`text-[10px] mt-1.5 text-right ${
                      msg.role === 'user' ? 'text-amber-100' : 'text-stone-400'
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-stone-100">
                  <div className="flex gap-1.5">
                    <span
                      className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms', animationDuration: '600ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms', animationDuration: '600ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms', animationDuration: '600ms' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Quick replies */}
            {showQuickReplies && (
              <div className="space-y-2 pt-1">
                <p className="text-xs text-stone-500 font-medium px-1">💡 Chọn nhanh:</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply.id}
                      onClick={() => handleQuickReply(reply)}
                      disabled={isLoading}
                      className="px-3 py-1.5 bg-white border border-amber-200 text-amber-700 rounded-full text-xs font-medium hover:bg-amber-50 hover:border-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Form */}
            {paymentInfo && (
              <div className="bg-gradient-to-br from-amber-50 to-green-50 rounded-2xl p-4 border border-amber-200 mt-4">
                <div className="text-center mb-3">
                  <span className="text-3xl mb-2 block">💳</span>
                  <h4 className="font-bold text-stone-800">Thanh toán đơn hàng</h4>
                  <p className="text-lg font-bold text-green-600 mt-1">
                    {paymentInfo.amount?.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
                
                {paymentInfo.qrUrl && (
                  <div className="bg-white rounded-xl p-2 mb-3">
                    <img 
                      src={paymentInfo.qrUrl} 
                      alt="QR Code" 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}
                
                <div className="bg-white rounded-xl p-3 mb-3">
                  <p className="text-xs text-stone-500 mb-1">Nội dung chuyển khoản:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-stone-100 px-3 py-2 rounded-lg font-mono text-sm font-bold text-stone-800 break-all">
                      {paymentInfo.paymentCode}
                    </code>
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
                      title="Sao chép"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {paymentInfo.instructions && (
                  <p className="text-xs text-stone-600 text-center mb-3">
                    {paymentInfo.instructions}
                  </p>
                )}

                <div className="flex gap-2">
                  {paymentInfo.qrUrl && (
                    <button
                      onClick={handleOpenQR}
                      className="flex-1 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all"
                    >
                      📱 Mở QR thanh toán
                    </button>
                  )}
                  <button
                    onClick={() => setPaymentInfo(null)}
                    className="px-4 py-2.5 bg-stone-100 text-stone-600 rounded-xl font-medium text-sm hover:bg-stone-200 transition-colors"
                  >
                    Đóng
                  </button>
                </div>

                <p className="text-[10px] text-stone-400 mt-3 text-center">
                  Thanh toán sẽ được xác nhận tự động trong 1-3 phút sau khi chuyển khoản
                </p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-stone-200 flex-shrink-0">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 text-sm transition-all"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2.5 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                aria-label="Gửi tin nhắn"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-stone-400 mt-2 text-center">
              Được hỗ trợ bởi Votive Academy · Hotline: 0385 448 747
            </p>
          </div>
        </div>
      )}
    </>
  );
}
