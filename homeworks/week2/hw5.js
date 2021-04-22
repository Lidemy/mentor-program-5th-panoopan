function join(arr, concatStr) {
    if(arr.length === 0) return ''
    if(arr.length === 1) return arr[0]
    var result = arr[0]
    for(var i=1; i<arr.length; i++){
        result += (concatStr + arr[i])
    }
    return result 
}

function repeat(str, times) {
    var result = ''
    for(var i=1; i<=times; i++){
        result += str
    }
    return result
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));

//參考解答
//join
function join(arr, concatStr) {
    if(arr.length === 0) return '' //special case: 當陣列是空的，回傳空字串
    
    var result = arr[0]
    for(var i=1; i<arr.length; i++){
        result+= (concatStr + arr[i])
    }
    return result 
}