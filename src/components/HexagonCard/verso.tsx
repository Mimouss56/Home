function VersoFace({title}: {title: string}) {

  return(
    <div className="overflow-hidden h-100 invisible " style={{ transform: "rotate(120deg)" }}>
      <div className="overflow-hidden h-100" style={{ transform: "rotate(-60deg)" }}>
        <div className="visible h-100" style={{ transform: "rotate(-60deg)" }}>
          <p className="bg-gradient bg-secondary d-flex justify-content-center align-items-center h-100 user-select-none fw-bolder">
            {title}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VersoFace;