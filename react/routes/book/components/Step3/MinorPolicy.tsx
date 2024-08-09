import React from "react";
import { Modal, ModalContent, ModalFooterButtons } from "monday-ui-react-core";
import { Button } from "@mui/material";

const MinorPolicy = ({
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
      title="Minor Policy"
      triggerElement={minorRef.current}
      show={isOpen}
      width="large"
      data-testid="2"
    >
      <ModalContent>
        <>
          <h5> Minor Travel/Parental Consent</h5>
          <h6> Minor Riding Alone</h6>
          <p>
            <strong>
              ( Any Passenger 12 -17 Years Old; Children Under The Age Of 12
              Must Be Accompanied By A Passenger 18 Years Or Older).
            </strong>
          </p>
          <p> Every minor riding alone on our shuttle must have:</p>
          <ul>
            <li>
              Parental Consent form signed by a parent or a legal guardian
            </li>
            <li>A Contact number for the parent or legal guardian</li>
            <li>Photo ID</li>
            <li>
              If the minor does not have a ID, then the following can be
              accepted:
              <ul>
                <li>Birth Certificate</li>
                <li>Passport</li>
                <li>Social Security Card</li>
                <li>Student ID</li>
              </ul>
            </li>
          </ul>
          <p>
            {" "}
            <strong>Every minor riding with an adult must have:</strong>{" "}
          </p>
          <ul>
            <li>ID</li>
            <li>Does not need a contact number</li>
            <li>Does not need a parental consent form</li>
          </ul>
          <p>
            {" "}
            <strong>For a minor with a connecting shuttle:</strong>{" "}
          </p>

          <p>
            Driver pays extra attention to make sure the minor is ok and on the
            shuttle Driver/Call Center Agent calls the parent or Legal Guardian
            to let them know that the minor is on the shuttle safely and heading
            to their next destination.
          </p>

          <p>
            <strong>
              If minor`&apos;s connecting shuttle is at the St. George Shuttle office:
            </strong>
          </p>

          <p>
            The driver makes sure that the minor checks in with the front desk
            so that we know he/she safely made it, and so we can contact the
            parent or legal guardian to update them on their child. Every minor
            is required to have a signed Parental Consent Form (PCF) prior to
            boarding the shuttle. Parental Consent Forms are available for
            download here. Forms are also available at our office, or we can fax
            them to you. Car seats or booster seats are required on children
            ages 5 years and younger, and are not provided by the shuttle.
          </p>
        </>
      </ModalContent>
      <ModalFooterButtons
        onSecondaryButtonClick={close}
        secondaryButtonText="Cancel"
        onPrimaryButtonClick={close}
        primaryButtonText="Confirm"
      />
    </Modal>
  );
};

export default MinorPolicy;
