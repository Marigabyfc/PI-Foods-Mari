//STYLES
import gif from '../../images/mimibubu (2).gif'
import styles from './Loader.module.css';

export default function Loader(){
    return(
        <div className={styles.loader}>
            <img src={gif} alt="Loading" />
            <span className={styles.spanLoader}>Loading . . . </span>
        </div>
    )
}
