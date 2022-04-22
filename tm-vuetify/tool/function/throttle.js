/**
 * 节流
 * @param {Function} fn 需要执行的方法，因this指向问题，建议不使用箭头函数，
 * @param {Number} delay 间隔时间，默认值100
 * **/
function throttle(fn,delay = 500){
    let valid = true;
    return function(...args) {
        if(!valid) {
            return 
        }
        valid = false;
        fn.apply(this,args)
        setTimeout(() => {
            valid = true
        },delay)
    }
}

export default throttle;