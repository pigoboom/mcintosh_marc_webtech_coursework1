function encodeDecodeToggle()
{
	var toggl = document.getElementById("toggleOutput").textContent;
	console.log(toggl)
	if (toggl == "Encoding")
	{
		document.getElementById("toggleOutput").innerHTML = "Decoding";
		document.getElementById("inputtext").innerHTML = "Enter ciphertext...";
		document.getElementById("outputtext").innerHTML = "Plaintext here...";
	}
	if (toggl == "Decoding")
	{
		document.getElementById("toggleOutput").innerHTML = "Encoding";
		document.getElementById("inputtext").innerHTML = "Enter plaintext...";
		document.getElementById("outputtext").innerHTML = "Ciphertext here...";
	}
}

function formatString(string)
{
	string = string.toLowerCase();
	for (var i = 0; i < string.length; i++)
	{
		var character = string.charCodeAt(i);
		if (character != 32)
		{
			if (character >= 123 || character <= 96)
			{	
				return false;
			}
		}
	}
	return string;
}


function hasNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
  }


function validateKey(key, cipher)
{
	alphabet = "abcdefghijklmnopqrstuvwxyz";
	numbers = "1234567890";
	if (cipher == "Ceasar")
	{
		if (key < 1 || key > 26)
		{
			alert("Key out of range");
			return false;
		}
		else
		{
			return true;
		}
	}
	if (cipher == "Vigenere")
	{
		var chara;
		for (var i = 0; i < key.length; i++)
		{
			chara = charAt(i);
			for (var j = 0; j < numbers.length; j++)
			{
				if (numbers.charAt(j) == chara)
				{
					alert("Key must not contain numbers")
					return false;
				}
			}
		}
		return true;
	}
	if (cipher == "ASCII_shift")
	{
		if (key < 1 || key > 128)
		{
			alert("key out of range")
			return false;
		}
		else
		{
			return true;
		}
	}


}

function changeKeyBox(){ //produces the correct message for the key depending on the cipher selected
	var cipher_selected = document.getElementById("cipher_list"), cipher_selected_val = cipher_selected.value;
	if (cipher_selected_val == "None")
	{
		document.getElementById("key_input").innerHTML = "Please select a cipher type";
		document.getElementById("aboutCipherBox").innerHTML = "";
	}
	if (cipher_selected_val == "Ceasar")
	{
		var str = "About Ceasar Cipher";
		var link = str.link("https://en.wikipedia.org/wiki/Caesar_cipher")
		document.getElementById("key_input").innerHTML = "add key 1 - 26";
		document.getElementById("aboutCipherBox").innerHTML = link;
	}
	if (cipher_selected_val == "Vigenere")
	{
		var str = "About Vigenere Cipher";
		var link = str.link("https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher")
		document.getElementById("key_input").innerHTML = "add key that is a word or letter ";
		document.getElementById("aboutCipherBox").innerHTML = link;
	}
	if (cipher_selected_val == "ROT13")
	{
		var str = "About ROT13 Cipher";
		var link = str.link("https://en.wikipedia.org/wiki/ROT13")
		document.getElementById("key_input").innerHTML = "No key required";
		document.getElementById("aboutCipherBox").innerHTML = link;
	}
	if (cipher_selected_val == "Morse")
	{
		var str = "About Morse code";
		var link = str.link("https://en.wikipedia.org/wiki/Morse_code")
		document.getElementById("key_input").innerHTML = "No key required";
		document.getElementById("aboutCipherBox").innerHTML = link;
	}

	if (cipher_selected_val == "ASCII_shift")
	{
		var str = "About ASCII shift";
		var link = str.link("https://en.wikipedia.org/wiki/ASCII")
		document.getElementById("key_input").innerHTML = "add key 1 - 128";
		document.getElementById("aboutCipherBox").innerHTML = link;
	}
}

function ceasarShift(plaintext, key, encOrDec) 
{
	if (encOrDec == "Decoding")
	{
		key = 26 - key
	}
	plaintext = formatString(plaintext);
	if (plaintext == false)
	{
		alert("Invalid character");
		return false;
	}
	var cipher_text = "";
	for (var i = 0; i < plaintext.length; i++)
	{
		var ascii = plaintext.charCodeAt(i);
		if (ascii == 32)
		{
			cipher_text = cipher_text + String.fromCharCode(ascii);
		}
		else
		{	
			if (ascii >= 97 && ascii <= 122)
			{
				ascii = ascii - 65;
				ascii = (ascii + key - 6) % 26;
				ascii = ascii + 65;
			}
			cipher_text = cipher_text + String.fromCharCode(ascii).toLowerCase();
		}
	}
	return cipher_text;
}

function posInAlpha(letter)
{
	var alphabet = "abcdefghijklmnopqrstuvwxyz";
	for (var i = 0; i < alphabet.length; i++)
	{
		if (alphabet.charAt(i) == letter)
		{
			return i;
		}
	}
}

function vigenereShift(plaintext, keyword, encOrDec)
{
	var alphabet = "abcdefghijklmnopqrstuvwxyz";
	var plainLetterPos;
	var keyLetterPos;
	var keywordCount = 0;
	var ciphertextNum;
	var cipherText = "";
	for (var i = 0; i < plaintext.length; i++)
	{
		if (keywordCount == keyword.length)
		{
			keywordCount = 0;
		}
		if (plaintext.charCodeAt(i) == 32)
		{
			cipherText = cipherText + String.fromCharCode(32);
		}
		else
		{
			plainLetterPos = posInAlpha(plaintext.charAt(i));
			keyLetterPos = posInAlpha(keyword.charAt(keywordCount))
			keywordCount += 1
			if (encOrDec == "Decoding")
			{
				ciphertextNum = (plainLetterPos - keyLetterPos -1) % 26;
			}
			else
			{
				ciphertextNum = (plainLetterPos + keyLetterPos -1 + 2) % 26;
			}
			if (ciphertextNum < 0)
			{
				ciphertextNum += 26;
			}
			cipherText = cipherText + alphabet.charAt(ciphertextNum);
		}
	}
	return cipherText;
}

function morseConverter(plaintext, encOrDec)
{
	var output = "";
	var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	var morse = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", ".--", "-..-", "-.--", "--.."];
	if (encOrDec == "Encoding")
	{
		for (var i = 0; i < plaintext.length; i++)
		{
			var cha = plaintext.charAt(i);
			for (var j = 0; j < alphabet.length; j++)
			{
				if (alphabet[j] == cha)
				{
					output += morse[j] + " ";
				}
			}
		}
		return output;
	}
	else
	{
		var morseLetter = "";
		for (var i = 0; i < plaintext.length; i++)
		{
			var cha = plaintext.charAt(i);
			if (cha != " ")
			{
				morseLetter += cha;
			}
			else
			{
				for (var j = 0; j < morse.length; j++)
				{
					if (morse[j] == morseLetter)
					{
						output += alphabet[j];
					}
				}
			morseLetter = "";
			}
		}
		return output;
	}
}

function asciiShift(plaintext, key, encOrDec)
{
	if (encOrDec == "Encoding")
	{
		var output = "";
		var letterNum;
		for (var i = 0; i < plaintext.length; i++)
		{
			letterNum = parseInt(plaintext.charCodeAt(i)) + parseInt(key);
			if (letterNum > 127)
			{
				letterNum -= 128;
			}
			output += String.fromCharCode(letterNum)
		}
		return output;
	}
	else
	{
		var output = "";
		var letterNum;
		for (var i = 0; i < plaintext.length; i++)
		{
			letterNum = parseInt(plaintext.charCodeAt(i)) - parseInt(key);
			if (letterNum <= 0)
			{
				letterNum += 128;
			}
			output += String.fromCharCode(letterNum);
		}
	}
	return output;
}

function copyToClipboard() {
	var copyText = document.getElementById("outputtext");
  	copyText.select();
  	document.execCommand("copy");
  } 

function main()
{
	var cipher = document.getElementById("cipher_list").value
	if (cipher == "Ceasar")
	{
		var key = parseInt(document.getElementById("key_input").value, 10);
		if (validateKey(key, cipher) == false)
		{
			return;
		}
		else
		{
			var outputCipher = ceasarShift(document.getElementById("inputtext").value, key, document.getElementById("toggleOutput").textContent)
			if (outputCipher != false)
			{
				document.getElementById("outputtext").innerHTML = outputCipher;
			}
		}
	}
	
	if (cipher == "Vigenere")
	{
		var keyword = document.getElementById("key_input").value;
		if (validateKey(keyword, cipher) == false)
		{
			alert("Keyword must only contain letters");
			return;
		}
		else
		{
			var outputCipher = vigenereShift(document.getElementById("inputtext").value, keyword, document.getElementById("toggleOutput").textContent)
			if (outputCipher != false)
			{
				document.getElementById("outputtext").innerHTML = outputCipher;
			}
		}
		
	}
	
	if (cipher == "ROT13")
	{
		var key = 13;
		var outputCipher = ceasarShift(document.getElementById("inputtext").value, key, document.getElementById("toggleOutput").textContent)
		document.getElementById("outputtext").innerHTML = outputCipher;
	}
	
	if (cipher == "Morse")
	{
		var outputCipher = morseConverter(document.getElementById("inputtext").value, document.getElementById("toggleOutput").textContent)
		document.getElementById("outputtext").innerHTML = outputCipher;
		
	}

	if (cipher == "ASCII_shift")
	{
		key = document.getElementById("key_input").value;
		if (validateKey(key, cipher) == false)
		{
			alert("Key error");
			return;
		}
		else
		{
			var outputCipher = asciiShift(document.getElementById("inputtext").value, key, document.getElementById("toggleOutput").textContent)
			if (outputCipher != false)
			{
				document.getElementById("outputtext").innerHTML = outputCipher;
			}
		}
	}
}