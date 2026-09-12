'use me';
import React, { useState, useRef, useEffect } from 'react';

export interface HandoverProofData {
  signatureUrl?: string;
  photoUrl?: string;
  collectorName?: string;
  collectedAt: string;
}

interface HandoverVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  outfit?: string;
  orderId?: string;
  onConfirm: (proofData: HandoverProofData) => Promise<void> | void;
}

export const HandoverVerificationModal: React.FC<HandoverVerificationModalProps> = ({
  isOpen,
  onClose,
  clientName,
  outfit,
  onConfirm,
}) => {
  const [activeTab, setActiveTab] = useState<'signature' | 'photo'>('signature');
  const [collectorName, setCollectorName] = useState(clientName || '');
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasCanvasDrawing, setHasCanvasDrawing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCollectorName(clientName || '');
      setSignatureDataUrl(null);
      setPhotoDataUrl(null);
      setHasCanvasDrawing(false);
      setActiveTab('signature');
    }
  }, [isOpen, clientName]);

  // Setup canvas drawing context when signature tab is active
  useEffect(() => {
    if (isOpen && activeTab === 'signature' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#121212';
      }
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  // Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setHasCanvasDrawing(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas && hasCanvasDrawing) {
      setSignatureDataUrl(canvas.toDataURL('image/png'));
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setHasCanvasDrawing(false);
    setSignatureDataUrl(null);
  };

  // Photo Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      let finalSignature = signatureDataUrl;
      if (!finalSignature && canvasRef.current && hasCanvasDrawing) {
        finalSignature = canvasRef.current.toDataURL('image/png');
      }

      const proofData: HandoverProofData = {
        signatureUrl: finalSignature || undefined,
        photoUrl: photoDataUrl || undefined,
        collectorName: collectorName.trim() || clientName,
        collectedAt: new Date().toISOString(),
      };

      await onConfirm(proofData);
      onClose();
    } catch (err) {
      console.error('Error confirming handover proof:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(18, 18, 18, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          background: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '24px 28px 20px', borderBottom: '1px solid #F2F4F7', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37' }}>
                Handover Verification
              </span>
              <h2 style={{ margin: '4px 0 0', fontSize: 20, fontWeight: 700, color: '#101828', fontFamily: 'var(--font-sora, sans-serif)' }}>
                Mark as Collected
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: 'none',
                background: '#F2F4F7',
                color: '#667085',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#EAECF0')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#F2F4F7')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 13, color: '#667085', fontFamily: 'var(--font-satoshi, sans-serif)' }}>
            Record proof of pickup/delivery for <strong>{clientName}</strong> {outfit ? `(${outfit})` : ''}
          </p>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px 28px', flex: 1, overflowY: 'auto' }}>
          {/* Collector Name Input */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#344054', marginBottom: 6 }}>
              Recipient / Collector Name
            </label>
            <input
              type="text"
              value={collectorName}
              onChange={(e) => setCollectorName(e.target.value)}
              placeholder="e.g. Client name or authorized representative"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: 14,
                borderRadius: '10px',
                border: '1px solid #D0D5DD',
                outline: 'none',
                fontFamily: 'var(--font-satoshi, sans-serif)',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#121212')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#D0D5DD')}
            />
          </div>

          {/* Mode Switch Tabs */}
          <div style={{ display: 'flex', background: '#F2F4F7', borderRadius: '12px', padding: 4, marginBottom: 20 }}>
            <button
              onClick={() => setActiveTab('signature')}
              style={{
                flex: 1,
                padding: '10px 14px',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'signature' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'signature' ? '#101828' : '#667085',
                boxShadow: activeTab === 'signature' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
              Client Digital Signature
            </button>
            <button
              onClick={() => setActiveTab('photo')}
              style={{
                flex: 1,
                padding: '10px 14px',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'photo' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'photo' ? '#101828' : '#667085',
                boxShadow: activeTab === 'photo' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              Photo Proof Upload
            </button>
          </div>

          {/* Tab 1: Signature Canvas */}
          {activeTab === 'signature' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#475467' }}>
                  Sign inside the pad below
                </span>
                {hasCanvasDrawing && (
                  <button
                    onClick={clearCanvas}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#D92D20',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    Clear Signature
                  </button>
                )}
              </div>
              <div
                style={{
                  border: '2px dashed #D0D5DD',
                  borderRadius: '12px',
                  background: '#F9FAFB',
                  overflow: 'hidden',
                  touchAction: 'none',
                  position: 'relative',
                }}
              >
                <canvas
                  ref={canvasRef}
                  width={464}
                  height={180}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  style={{ width: '100%', height: 180, display: 'block', cursor: 'crosshair' }}
                />
                {!hasCanvasDrawing && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      pointerEvents: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#98A2B3',
                      fontSize: 13,
                    }}
                  >
                    Draw signature here with finger or mouse
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Photo Upload */}
          {activeTab === 'photo' && (
            <div>
              <span style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475467', marginBottom: 8 }}>
                Upload photo of completed outfit / package handover
              </span>
              {photoDataUrl ? (
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid #EAECF0' }}>
                  <img src={photoDataUrl} alt="Handover Proof" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block' }} />
                  <button
                    onClick={() => setPhotoDataUrl(null)}
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: 'rgba(18, 18, 18, 0.75)',
                      color: '#FFF',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Remove Photo
                  </button>
                </div>
              ) : (
                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '32px 16px',
                    border: '2px dashed #D0D5DD',
                    borderRadius: '12px',
                    background: '#F9FAFB',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#121212')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#D0D5DD')}
                >
                  <input type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: '#EAECF0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 12,
                      color: '#344054',
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                      <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#101828' }}>Click to upload or take a photo</span>
                  <span style={{ fontSize: 12, color: '#667085', marginTop: 4 }}>Supports JPG, PNG, WEBP</span>
                </label>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '16px 28px 24px',
            borderTop: '1px solid #F2F4F7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 12,
            background: '#FAFAFA',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '10px 18px',
              fontSize: 14,
              fontWeight: 600,
              color: '#344054',
              background: '#FFFFFF',
              border: '1px solid #D0D5DD',
              borderRadius: '10px',
              cursor: 'pointer',
              fontFamily: 'var(--font-satoshi, sans-serif)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            style={{
              padding: '10px 22px',
              fontSize: 14,
              fontWeight: 600,
              color: '#FFFFFF',
              background: '#121212',
              border: 'none',
              borderRadius: '10px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(18, 18, 18, 0.2)',
              fontFamily: 'var(--font-satoshi, sans-serif)',
            }}
          >
            {isSubmitting ? 'Confirming...' : 'Confirm & Mark Collected ✓'}
          </button>
        </div>
      </div>
    </div>
  );
};
