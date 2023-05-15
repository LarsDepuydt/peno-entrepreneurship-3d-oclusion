
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
        <p className={stylesVR.legenda_list_item}>Squeeze</p>
        <p id={stylesVR.legenda_list_item_underline} className={stylesVR.legenda_list_item}>
          Right:
        </p>
        <p className={stylesVR.legenda_list_item}>A</p>
        <p className={stylesVR.legenda_list_item}>B</p>
        <p className={stylesVR.legenda_list_item}>Squeeze</p>
        <p id={stylesVR.legenda_list_item_underline} className={stylesVR.legenda_list_item}>
          Both:
        </p>
        <p className={stylesVR.legenda_list_item}>Select</p>
      </div>
      <div className={stylesVR.legenda_list}>
        <p id={stylesVR.legenda_list_item_spacer} className={stylesVR.legenda_list_item}>
          {'.'}
        </p>
        <p className={stylesVR.legenda_list_item}>Lock axis</p>
        <p className={stylesVR.legenda_list_item}>Menu</p>
        <p className={stylesVR.legenda_list_item}>Zoom in</p>
        <p id={stylesVR.legenda_list_item_spacer} className={stylesVR.legenda_list_item}>
          {'.'}
        </p>
        <p className={stylesVR.legenda_list_item}>Undo</p>
        <p className={stylesVR.legenda_list_item}>Redo</p>
        <p className={stylesVR.legenda_list_item}>Zoom out</p>
        <p id={stylesVR.legenda_list_item_spacer} className={stylesVR.legenda_list_item}>
          {'.'}
        </p>
        <p className={stylesVR.legenda_list_item}>Hold to drag</p>
      </div>
    </div>
  );
}
