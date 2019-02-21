/**
 * Author：tantingting
 * Time：2019/2/19
 * Description：Description
 */
import './css/index.scss'
import img from './img/info_1159.png'
import {test1} from './common/a'
console.log(test1())
document.getElementsByClassName('contenr')[0].innerHTML=`<img src="${img}">`
const fn = () => {
    let a = {
        'name': 123,
        'age': 222,
    }
    let b = {
        'aa': 'aa',
        'bb': 'bb'
    }
    let c = Object.assign({}, a, b)
    console.log('====', a, b, c)
}
fn()
