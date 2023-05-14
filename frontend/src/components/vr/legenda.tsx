import { Canvas } from '@react-three/fiber';
import { Html, Plane } from '@react-three/drei';
import stylesVR from '@/styles/MenuVR.module.css';

export function Legenda() {
  return (
    <div className={stylesVR.legenda}>
      <div className={stylesVR.legenda_list}>
        <p id={stylesVR.legenda_list_item_underline} className={stylesVR.legenda_list_item}>
          Left:
        </p>
        <p className={stylesVR.legenda_list_item}>X</p>
        <p className={stylesVR.legenda_list_item}>Y</p>
        <p id={stylesVR.legenda_list_item_underline} className={stylesVR.legenda_list_item}>
          Right:
        </p>
        <p className={stylesVR.legenda_list_item}>A</p>
        <p className={stylesVR.legenda_list_item}>B</p>
        <p id={stylesVR.legenda_list_item_underline} className={stylesVR.legenda_list_item}>
          Both:
        </p>
        <p className={stylesVR.legenda_list_item}>Select</p>
        <p className={stylesVR.legenda_list_item}>Squeeze</p>
      </div>
      <div className={stylesVR.legenda_list}>
        <p id={stylesVR.legenda_list_item_spacer} className={stylesVR.legenda_list_item}>
          {'.'}
        </p>
        <p className={stylesVR.legenda_list_item}>Lock Axis</p>
        <p className={stylesVR.legenda_list_item}>Menu</p>
        <p id={stylesVR.legenda_list_item_spacer} className={stylesVR.legenda_list_item}>
          {'.'}
        </p>
        <p className={stylesVR.legenda_list_item}>Undo</p>
        <p className={stylesVR.legenda_list_item}>Redo</p>
        <p id={stylesVR.legenda_list_item_spacer} className={stylesVR.legenda_list_item}>
          {'.'}
        </p>
        <p className={stylesVR.legenda_list_item}>Hold to drag</p>
        <p className={stylesVR.legenda_list_item}>Hold to zoom</p>
      </div>
    </div>
  );
}
