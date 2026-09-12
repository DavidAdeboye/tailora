'use me';
import React from 'react';
import { HandoverProofData } from './HandoverVerificationModal';

interface HandoverProofViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  outfit?: string;
  proofData?: HandoverProofData;
}

export const HandoverProofViewModal: React.FC<HandoverProofViewModalProps> = ({
  isOpen,
  onClose,
  clientName,
  outfit,
  proofData,
}) => {
  if (!isOpen || !proofData) return null;

  const formattedDate = proofData.collectedAt
    ? new Date(proofData.collectedAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'N/A';

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
          maxWidth: 480,
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '4px 10px',
                  background: '#ECFDF3',
                  color: '#027A48',
                  borderRadius: '12px',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                ✓ Verified Handover
              </span>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: 'none',
                background: '#F2F4F7',
                color: '#667085',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <h2 style={{ margin: '10px 0 2px', fontSize: 18, fontWeight: 700, color: '#101828', fontFamily: 'var(--font-sora, sans-serif)' }}>
            {clientName}
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: '#667085', fontFamily: 'var(--font-satoshi, sans-serif)' }}>
            {outfit ? `${outfit} • ` : ''}Collected on {formattedDate}
          </p>
        </div>

        {/* Content Body */}
        <div style={{ padding: '20px 28px 28px', flex: 1, overflowY: 'auto' }}>
          {/* Details Metadata */}
          <div style={{ background: '#F9FAFB', border: '1px solid #EAECF0', borderRadius: '12px', padding: '14px 16px', marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
              <span style={{ color: '#667085' }}>Collected By:</span>
              <span style={{ fontWeight: 600, color: '#101828' }}>{proofData.collectorName || clientName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: '#667085' }}>Timestamp:</span>
              <span style={{ fontWeight: 600, color: '#101828' }}>{formattedDate}</span>
            </div>
          </div>

          {/* Signature Proof */}
          {proofData.signatureUrl && (
            <div style={{ marginBottom: 20 }}>
              <span style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#667085', marginBottom: 8, letterSpacing: '0.05em' }}>
                Client Digital Signature
              </span>
              <div style={{ border: '1px solid #EAECF0', borderRadius: '12px', background: '#F9FAFB', padding: 12, textAlign: 'center' }}>
                <img src={proofData.signatureUrl} alt="Client Signature" style={{ maxHeight: 120, maxWidth: '100%', objectFit: 'contain' }} />
              </div>
            </div>
          )}

          {/* Photo Proof */}
          {proofData.photoUrl && (
            <div>
              <span style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#667085', marginBottom: 8, letterSpacing: '0.05em' }}>
                Photo Proof of Handover
              </span>
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #EAECF0' }}>
                <img src={proofData.photoUrl} alt="Photo Proof" style={{ width: '100%', maxHeight: 240, objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          )}

          {!proofData.signatureUrl && !proofData.photoUrl && (
            <p style={{ fontSize: 14, color: '#667085', textAlign: 'center', margin: '20px 0' }}>
              Handover was recorded without digital media proof.
            </p>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid #F2F4F7', background: '#FAFAFA', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 18px',
              fontSize: 13,
              fontWeight: 600,
              color: '#344054',
              background: '#FFFFFF',
              border: '1px solid #D0D5DD',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
