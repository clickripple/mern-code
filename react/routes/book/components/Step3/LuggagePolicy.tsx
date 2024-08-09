import { Modal, ModalContent, ModalFooterButtons } from "monday-ui-react-core";

const LuggagePolicy = ({
  isOpen,
  minorRef,
  close,
}: {
  isOpen: boolean;
  minorRef: any;
  close: () => void;
}) => {
  return (
    <Modal
      contentSpacing
      id="story-book-modal"
      onClose={close}
      title="Luggage Policy"
      triggerElement={minorRef.current}
      show={isOpen}
      width="large"
      data-testid="ab"
    >
      <ModalContent>
        <ul>
          <li>Each passenger is allowed to check 2 bags.</li>
          <li>
            Any luggage in excess of 2 pieces will be $25 per additional piece.
          </li>
          <li>
            Please contact our office if you have additional luggage
            requirements, as arrangements do need to be made beforehand.
          </li>
          <li>
            The driver is not responsible for lifting any luggage over 50 lbs.
            Anymore will be charged extra.
          </li>
          <li>
            If any issues arise with luggage due to an error by St George
            Shuttle, compensation is maxed at $200.00 per person.
          </li>
        </ul>
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

export default LuggagePolicy;
