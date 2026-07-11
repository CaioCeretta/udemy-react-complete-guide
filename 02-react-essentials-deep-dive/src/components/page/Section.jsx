export default function Section({ title, children, ...rest }) {
  return (
    <section {...rest}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
