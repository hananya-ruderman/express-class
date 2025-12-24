const array = [1,2,3,4,5];

function filter(cb, arr=array){
    const result = [];
    for (let i = 0; i< arr.length; i++){
        const item = arr[i];
        if(cb(item)) result.push(item)
    }
return result
}

console.log(filter((item) => item > 2))