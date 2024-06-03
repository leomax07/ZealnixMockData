import { Sidebar } from "primereact/sidebar";

interface Sidebarprops {
  header?: any;
  body?: any;
  footer?: any;
  width?: number;
  visible?: boolean;
  setVisible: Function;
}

function RightSideBar({
  header,
  body,
  footer,
  width = 696,
  visible,
  setVisible,
}: Sidebarprops) {
  return (
    <div className="right__sidebar__container">
      <Sidebar
        className="right__sidebar"
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        style={{ width }}
      >
        <div className="header">{header}</div>
        <div className="body">{body}</div>
        <div className="footer">{footer}</div>
      </Sidebar>
    </div>
  );
}

export default RightSideBar;
