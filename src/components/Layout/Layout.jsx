import { LayoutWrapper } from './styles';


const Layout = props => {
  const { inline, gap, center, children } = props;

  return (
    <LayoutWrapper inline={inline} gap={gap} center={center}>
      {children}
    </LayoutWrapper>
  );
};

export { Layout };