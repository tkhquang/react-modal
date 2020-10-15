import React from "react";

const SamplePopup = () => {
  return (
    <div>
      <b>Custom Hooks and HOC implementation.</b>
      <p>
        Hello, if you click on the <strong>Ok</strong> button, it will trigger an asynchronous event for 3 seconds. This is only to show that it can handle asynchronous events (useful for form submitting or similar cases).
      </p>
      <p>
        If you click on the <strong>(X)</strong> button or <strong>Cancel</strong> button, the modal will be closed immediately.
      </p>
      <p>
        It <strong>cannot</strong> be closed by <strong>clicking outside</strong> the content or by <strong>pressing ESC</strong> 
      </p>
    </div>
  );
};

export default SamplePopup;
