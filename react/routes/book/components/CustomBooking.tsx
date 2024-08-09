'use client'
import { Modal, ModalContent, ModalFooterButtons } from "monday-ui-react-core";

const CustomBooking = ({
  isOpen,
  minorRef,
  close,
}: {
  isOpen: boolean;
  minorRef: any;
  close: () => void;
}) => {
  return (
    // <p>kk</p>
    <Modal
      contentSpacing
      id="story-book-modal"
      onClose={close}
      title="Customized bookings"
      triggerElement={minorRef.current}
      show={isOpen}
      width="large"
      data-testid="ab"
    >
      <ModalContent>
        <div>We also offer customized bookings and door to door services. </div>
        <div>
          Just give us a call at +1 (435) 599 1180 or shoot us an email at
          shuttlehurricane@gmail.com.
        </div>
        <p>We&apos;ll try to reach you as soon as possible.</p>
      </ModalContent>
      <ModalFooterButtons
        onPrimaryButtonClick={close}
        primaryButtonText="Confirm"
        onSecondaryButtonClick={close}
        secondaryButtonText="Cancel"
      />
    </Modal>
  );
};

export default CustomBooking;
