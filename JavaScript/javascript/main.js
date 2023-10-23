function vowelsSubStrings(s){
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let subStrings = [];
    let subString = "";
    for(let i = 0; i < s.length; i ++){
        if(vowels.has(s[i])){
            subString += s[i];
        }
        if(!vowels.has(s[i])){
            subStrings.push(subString);
            subString = "";
        }
        if(i == s.length -1 ){
            subStrings.push(subString);
        }
    }

    let counter = [];
    let vowelsPositions = [0, 0, 0, 0, 0];
    subStrings.forEach((item) => {
        for(let i = 0; i < item.length; i ++){
            let subItem = item.substring(i, item.length);
            for(let j = 0; j < subItem.length; j ++){
                if(subItem[j] == "a"){
                    vowelsPositions[0] ++;
                }
                if(subItem[j] == "e"){
                    vowelsPositions[1] ++;
                }
                if(subItem[j] == "i"){
                    vowelsPositions[2] ++;
                }
                if(subItem[j] == "o"){
                    vowelsPositions[3] ++;
                }
                if(subItem[j] == "u"){
                    vowelsPositions[4] ++;
                }
            }
            let hasSecuence = vowelsPositions.every(element => element > 0);
            if(hasSecuence)
                counter.push(hasSecuence);
            vowelsPositions = [0, 0, 0, 0, 0];
        }
    })

    return counter.length;
}


function main(){
    // expect 2
    console.log(vowelsSubStrings("aaeiouxae"));
    console.log(vowelsSubStrings("bcaekfaaeioau"));
    console.log(vowelsSubStrings("axyzaeiou"));
}

main();