function Snow({count}: {count: number}) {
  return (
    new Date().getMonth() === 11 && (
      [...Array(count)].map((index) => (
        <div key={index} className="snow" />
      ))
    )
  );
}

export default Snow;
