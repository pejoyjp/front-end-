/*
   The state of Promise depends on
        1): relove
        2): reject
        3): throw error
*/

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise{
    PromiseState = PENDING
    PromiseResult = undefined
    //save  callbacks
    fulfilledCbs = []
    rejectCbs = []
    constructor(executor) {
        try {
            //state + result
            //the code that is in Promise execute immediately
        executor(this.resolve.bind(this), this.reject.bind(this)) //notice！！！@@！ this!!!!
        } catch (err) {
            //if it's an error(throw error)  goto reject 
            this.reject(err)
        }  
    }
    //once State changes from pending to fulfilled/rejected. it cannot be changed any more.
    resolve(valye) {
        if(this.PromiseState !== PENDING) return 
        this.PromiseState = FULFILLED
        this.PromiseResult = val 
        //if states is 'fulfilled', implment all the callbacks from fulfilledCbs
        while (this.fulfilledCbs.length) {
            //invoke callbacks
            this.fulfilledCbs.shift()()
        }
    }
    reject(reason) {
        if(this.PromiseState !== PENDING) return 
        this.PromiseState = REJECTED
        this.PromiseResult = reason
        while (this.rejectCbs.length) {
            //invoke callbacks
            this.rejectCbs.shift()()
        }

    }
    /*  Then
        parameter: 2 callbacks
        if states is fulfilled/rejected, the first/second callback is excuted 
        if states is pending, 2 callbacks are save       
        --------------------------------------------------------
        (then) return a new Promise obj, the result of that deponds on the returned value of callback 
            if it returns a new Promise obj, returned value will be 'fulfilled'
        if the returned value is non-Promise
            the new Promise will be 'fulfilled',the value is returned value 

    */
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onFulfilled : reason => { throw reason }
        
        const thenPromise = new MyPromise((resolve, reject) => {
            const resolvePromise = cb => {
                //try catch cannot catch asynchronous task
                queueMicrotask(() => {
                    try {
                        let x = cb(this.PromiseResult)
                        //x cannot equal to thenPromise
                        if (x === thenPromise) {
                            throw new Error('Error, cannot return itself')
                        }
                        if (x instanceof MyPromise) {
                            //if returned value is successful, go resolve.
                            //if returned value is faild, go reject
                            x.then(resolve,reject)
                        } else {
                            resolve(x)
                        }
                    } catch (err) {
                        reject(err)
                    }                   
                })    
            }
            if (this.PromiseState === FULFILLED) {
                resolvePromise(onFulfilled)           
                
            } else if (this.PromiseState === REJECTED) {
                resolvePromise(onRejected)
            } else if (this.PromiseState === PENDING) {
                //fist this: it based on current obj
                //second this: the first parameter when onFulfilled is invoked
                //bind return a new funciton 
                this.fulfilledCbs.push(resolvePromise.bind(this,onFulfilled))
                this.rejectCbs.push(resolvePromise.bind(this,onRejected))
            }
        }) 
        return thenPromise
    }
    /*all is a static method, which need a array as the parameter 
    if all the members of array are fulfilled, then return a promise taht is fulfilled
    if there is 1 rejected obj,then return a rejected promise 
    */
    static all(arr) {
        const result = []
        let n = 0
        
        return new MyPromise((resolve, reject) => {
            const addData = (index,val) => {
                result[index] = val
                    n++
                    if (n === arr.length) {
                        resolve(result)
                    }
            }
            arr.forEach((item,index) => {
                if (item instanceof MyPromise) {
                    item.then(val=>addData(index,val)
                        ,reject)
                } else {
                    addData(index,val)
                }
            })
        })
    }

    /*
    race is a static method, which need a array as the parameter 
    the state and result of Promise  are depends on the fasttest result in the array 
    the literal of array is fulfilled Promise
    */
    static race(arr) {
        return new MyPromise((resolve, reject) => {          
            arr.forEach(item => {
                if (item instanceof MyPromise) {
                    item.then(resolve,reject)
                } else {
                    //because on top of that, asynchronos tasks is used. To ensure they have the 
                    //speed. It needs to use QueueMirotaks as well. 
                    queueMicrotask(() => {
                    {                        
                        resolve(item)
                    }})
                    
                }
            })
    
        })
    }
}