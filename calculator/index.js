var input = document.getElementById('par1');
const output = document.getElementById("par2");
const butn = document.querySelectorAll('.btn');

var stack = [];
var mystr = "";

function handleclick(event) {
    console.log(event.target.textContent);
    const a = event.target.innerHTML;
    mystr = input.innerHTML;
    if (a === 'del' || a === 'ans' || a === 'clear' || a === 'enter') {
        switch (a) {
            case 'enter':
            case 'ans':
                let result = eval(mystr);
                output.innerHTML = result;
                break;

            case 'clear':
                input.innerHTML = ""
                output.innerHTML = ""
                break
            case 'del':
                let val = input.innerHTML.match(/\d+|\D/g);
                input.innerHTML = val.slice(0, val.length - 1).join('')
                break
        }
    } else {
        // stack.push(a)
        input.innerHTML += a;
    }
}
