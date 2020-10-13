import React from "react";

import Modal from "components/Modal/";
import SamplePopup from "components/SamplePopup";

function App() {
  async function onOk() {
    console.log("Please wait...");

    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
    console.log("OK, done!");
  }

  function onCancel() {
    console.log("Canceled!");
  }

  return (
    <>
      <h1>
        React Modal Assessment
      </h1>
      <div>
        <Modal
          title="Simple ReactJS Modal"
          trigger={open => {
            return (
              <button
                type="button"
                className="button"
                onClick={open}
              >
                Open modal
              </button>
            )}
          }
          onCancel={onCancel}
          onOk={onOk}
          content={close => (
            <SamplePopup />
          )}
        />
      </div>
    </>
  );
}

export default App;
