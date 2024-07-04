import AddFeedBack from '../Modal/Feedback/addFeedback';

export default function Feedback() {
  return (
    <>
      <div
        className="position-fixed "
        style={{ top: '75%', zIndex: 1000 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#feedbackModal"
          className="btn btn-primary rounded-start-0 text-light z-0 "
        >
          Feedback
        </button>
      </div>
      <AddFeedBack onAddElement={() => { }} />
    </>

  );
}
