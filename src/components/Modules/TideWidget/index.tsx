function TideWidget({ port }: { port: number }) {
  console.log(new Date().getTime() / 1000);

  return (
    <div className="position-sticky bottom-0 end-0">
      <iframe
        src={`https://horloge.maree.frbateaux.net/ws${port}`}
        height="217"
        title="Calendrier des marées"
      />

    </div>
  );
}

export default TideWidget;
