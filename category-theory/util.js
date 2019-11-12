export function uuid32 (length = 15, prefix = "", suffix = "") {
    const digits = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v']
    //Creates a random 10 digit base 32
    let id = "";
    for (let i = 0; i < length; i++) {
        id = id +  digits[Math.floor(Math.random()*32)];
    }
    return prefix + id + suffix;
}