import styleB from '@/styles/Buttons.module.css';

/* still needs to be implemented, just a dummy button */

export default function OpenObjButton() {
  return (
    <div>
      <button type="button" className={styleB.relu_btn} id={styleB.objIcon}></button>
    </div>
  );
}
