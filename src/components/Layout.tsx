type props = {
  children: React.ReactNode;
};
const Layout = (props: props) => {
  return (
    <section>
      <div>
        <p>Тестирование</p>
      </div>
      {props.children}
    </section>
  );
};

export default Layout;
