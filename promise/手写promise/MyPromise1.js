class MyPromise1{
    promiseState = 'pending'
    primiseResult = undefined
    constructor(excutor) {
        try {
            excutor(this.reslove.bind(this),this.reject.bind(this))
        } catch(err) {
            this.reject(err)
        }
        
    } 
    reslove(val) {
        if(this.promiseState !== 'pending') return 
        this.promiseState = 'fulfilled'
        this.primiseResult = val
        
    }
    reject(reason) {
        if (this.promiseState !== 'pending') return 
        this.promiseState = 'rejected'
        this.primiseResult = reason
    }

}