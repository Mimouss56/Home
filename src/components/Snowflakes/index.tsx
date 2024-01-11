function Snow() {
  return (
    new Date().getMonth() === 11 && (
      [...Array(150)].map((index) => (
        <div key={index} className="snow" />
      ))
    )
  );
}

export default Snow;
