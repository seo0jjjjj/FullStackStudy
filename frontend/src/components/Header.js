export function Header(props) {
  const { title } = props;
  return (
    <div className="header">
      <h2>{title}</h2>
    </div>
  );
}
