function RectoFace({ urlImgState, title }: { urlImgState: string, title: string }) {

  const style = {
    frontStyle: {
      backfaceVisibility: "hidden" as const,
      WebkitBackfaceVisibility: "hidden" as const,
    },
  }
  return (
    <div className="position-absolute h-100" style={style.frontStyle}>
      <div className="overflow-hidden h-100 invisible " style={{ transform: "rotate(120deg)" }}>
        <div className="overflow-hidden h-100" style={{ transform: "rotate(-60deg)" }}>
          <div className="visible h-100" style={{ transform: "rotate(-60deg)" }}>
            <img src={urlImgState} alt={title} className="h-100 w-100 object-fit-cover " />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RectoFace;