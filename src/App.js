import { useEffect, useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './App.css';
import copyToCp from './assets/cp.png'



const l_letters = 'abcdefghijklmnopqrstuvwxyz';
const c_letters = l_letters.toUpperCase();
const nums = '1234567890';
const spec_chars = '~`!@#$%^&*()-_+={}[]|\;:"<>,./?';
let generated_pwd='';
let char_map = new Map();
char_map.set('low',l_letters)
let allowed_chars='';

function App() {

    const [pwd, setPwd] = useState('');
    const [size, setSize] = useState(10);
    const [inputs, setInputs] = useState({
        upper : false,
        lower : true,
        numbers : false,
        // space : false,
        // spec_chars : false,
        duplicte : false
    })

    function changePwd(e) {
        setInputs(prev=>({
            ...prev,
            [e.target.name] : e.target.checked
        }))
    }

    
    useEffect(()=>{
            char_map.clear();
            inputs.lower && char_map.set('low',l_letters);
            inputs.upper && char_map.set('cap',c_letters);
            inputs.numbers && char_map.set('num',nums);
            inputs.spec_chars && char_map.set('spec',spec_chars);
    },[inputs])
    
    useEffect(()=>{
        if(!(inputs.lower) && !(inputs.upper) && !(inputs.numbers) && !(inputs.spec_chars)){
            setPwd("Check at least one box")
        }else{
            if(size<=25){
                allowed_chars = '';
                for (const m of char_map.values()) {
                    allowed_chars += m;
                }
                
                for(let i=0; i<size; i++){
                    let l_rand = Math.floor(Math.random()*allowed_chars.length);
                    generated_pwd += allowed_chars[l_rand];
                    setPwd(generated_pwd)
                    //rand_pwd.style.color='white'
                }
            }else{
                setPwd("maximum 25 letters allowed")
                //rand_pwd.style.color='red'
            }
            generated_pwd=''; 
        }
    }
    ,[size,inputs])

    
    function changePwdSize(e) {
        setSize(e.target.value)
    }

  return (
    <div className='container'>
        <h2 id="title">Strong Random Password Generator</h2>

        <div className="main">
            <h2 id="pwd">{pwd}
            <CopyToClipboard text={pwd}>
                <button id="copy"><i class="fa-regular fa-copy"></i></button>
            </CopyToClipboard>
            </h2>

            <div>
                <div className="inputs">
                                   
                        <input
                            type="number"
                            id="size"
                            name='pwd_size'
                            value={size}
                            onChange={changePwdSize}
                        />
                        <label htmlFor="size"> Characters</label>
                    
                    <br/><br/><p>Password Options: </p><br/>
                    <div className='input'>
                        <input 
                            type="checkbox" 
                            name="lower" 
                            id="low"
                            checked={inputs.lower}
                            onChange={changePwd}
                            />
                        <label htmlFor="low"> Use: a b c d e f g h i j k l m n o p q r s t u v w x y z</label>
                    </div>

                    <div className='input'>
                        <input 
                            type="checkbox" 
                            name="upper" 
                            id="cap" 
                            checked={inputs.upper}
                            onChange={changePwd}
                            />
                        <label htmlFor="cap"> Use: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</label>
                    </div>
                    

                    <div className='input'>
                        <input 
                            type="checkbox" 
                            name="numbers" 
                            id="num"
                            checked={inputs.numbers}
                            onChange={changePwd}
                            />
                        <label htmlFor="num"> Use: 0 1 2 3 4 5 6 7 8 9</label>
                    </div>
                    
                    <div className='input'>
                        <input 
                            type="checkbox" 
                            name="spec_chars" 
                            id="spec" 
                            checked={inputs.spec_chars}
                            onChange={changePwd}
                            />
                        <label htmlFor="spec"> {"Use: ~ ` ! @ # $ % ^ & * ( ) - _ + = { } [ ] | \ ; : \" < > , . / ? "}</label>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
