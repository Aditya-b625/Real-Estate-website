import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { contactOwner } from '../../apiRoute';
import { toast } from 'react-toastify';

const ContactOwnerModal = ({ show, onHide, userEmail, userName, ownerEmail, propertyTitle }) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return toast.warning('Message cannot be empty');

    try {
      setSending(true);
      // const token = sessionStorage.getItem('token'); // JWT

      await contactOwner({
        ownerEmail,
        propertyTitle,
        message
      }
      );

      toast.success('Message sent successfully');
      setMessage('');
      onHide();
    } catch (err) {
      console.error('Send failed:', err);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Contact Owner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="userEmail">
            <Form.Label>Your Email</Form.Label>
            <Form.Control type="email" value={userEmail} disabled/>
          </Form.Group>

          <Form.Group controlId="message" className="mt-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              autoFocus
              rows={4}
              placeholder="Type your message to the property owner..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <p className="text-muted mt-3 small text-center">
            Please avoid sharing sensitive information. Messages will be sent securely.
          </p>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleSend} disabled={sending}>
          {sending ? 'Sending...' : 'Send'}
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default ContactOwnerModal;
