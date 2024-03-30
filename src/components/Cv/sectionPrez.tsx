function SectionPrez({ description }: { description: string }) {
  return (
    <section className="bg-dark w-100">
      <div className="d-flex justify-content-between mb-5 mx-auto border-1 border-top border-bottom p-2 bg-secondary">
        <h2>Présentation</h2>
      </div>
      <p className="m-3 w-75 mx-auto">{description}</p>
    </section>
  );
}

export default SectionPrez;
