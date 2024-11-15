# Salted Hashes And Their Security

---

**Author:** Luddekn | **Date:** January 13, 2024 | **Topic:** Python

---

To understand what salted hashes are we first need to know what a hash is.

### § What is a hash?

Well, a hash is essentially a **one-way** conversion of any data to a fixed-length value that can’t be decrypted to its original value, hence the meaning of one-way.

And why does this matter? Let’s say you have a secret, let’s say this secret is a password, and you don’t want anyone to know this password, so you convert your password into a hash value, well now no one can convert it back to its original form, right? Well technically yes if you have a really strong unguessable password, but even when your password is strong it can still be “cracked”.

What does the term “**cracked**” mean? From a high-level perspective, cracking a hash means that the original hash value is compared against multiple hash values, and if the original hash value matches one of those hashes we would have the un-hashed value of the original hash.

To illustrate this we have one hashed password, and we are comparing that hash against multiple hashed words to see if we can get a match:

```plaintext
Original Password (OP) = Password1
OP MD5 hash = 2ac9cb7dc02b3c0083eb70898e549b63

Comparing:
1. 2ac9cb7dc02b3c0083eb70898e549b63 = 6a19a89eb2b5c448e6b9575fde6c2f61 (rockyou)
2. 2ac9cb7dc02b3c0083eb70898e549b63 = 10b0b90917570de06ad2b0e46e46e70e (password2)
3. 2ac9cb7dc02b3c0083eb70898e549b63 = f25a2fc72690b780b2a14e140ef6a9e0 (iloveyou)
4. 2ac9cb7dc02b3c0083eb70898e549b63 = 2ac9cb7dc02b3c0083eb70898e549b63 (Password1)

Found match on attempt 4! 2ac9cb7dc02b3c0083eb70898e549b63 = Password1
```

As you can see from this little example, weak passwords would not be hard to crack for someone with the knowledge to do so using automated tools and wordlists.

### § What is a salted hash?

A salted hash is just like any other hash but with an extra value added to it, making it more secure than your typical hash. Cracking a salted hash would require you to know the salt, which can be a really difficult task to achieve since the salt can be randomly generated and can be as long as you want it to be. It’s a fairly simple concept that can drastically increase the security of hashes.

Let’s demonstrate it using the same example from above but with a salt added to the password:

```plaintext
Original Password (OP) = Password1
Salt (S) = ThisIsMySecretSalt
Combined (SOP) = ThisIsMySecretSaltPassword1
SOP MD5 hash = 949df96ef90e7ccd92df7adea445f549

Comparing:
1. 949df96ef90e7ccd92df7adea445f549 = 6a19a89eb2b5c448e6b9575fde6c2f61 (rockyou)
2. 949df96ef90e7ccd92df7adea445f549 = 10b0b90917570de06ad2b0e46e46e70e (password2)
3. 949df96ef90e7ccd92df7adea445f549 = f25a2fc72690b780b2a14e140ef6a9e0 (iloveyou)
4. 949df96ef90e7ccd92df7adea445f549 = 2ac9cb7dc02b3c0083eb70898e549b63 (Password1)

No matches found!
```

Even if we guess the password to be “Password1” it will not match since we added the salt “ThisIsMySecretSalt” to the start of the password, meaning that the hash value is going to be different. This is just to demonstrate how powerful a salted hash can be, and why it should be used to store sensitive data.

We can easily create salted hashes using a Python script that generates a random salt with a specified length, combines it with a password, and then hashes the data (**PoC**):

```python
import string
import hashlib
import random

# Just a sample password to use for this PoC
password = "Password1"

# Creating the character set which includes Aa-Zz, 0-9, and special characters we are going to use to create the salt
charset = list(string.ascii_lowercase) + list(string.ascii_uppercase) + list(string.digits) + list(string.punctuation)

# Using the random library we pick a number of elements from the "charset" list
# The number can be changed depending on how long you want the salt to be
randomized = random.sample(charset, 37)

# We then combine evry random element into one string
salt = "".join(randomized)

# We then combine the salt and the password
combined = salt + password

# Then we hash the combined string using the hashlib library, we can choose the hashing algorithm, for this PoC
# We are using the MD5 hasging algorithm
hashed = hashlib.md5(combined.encode()).hexdigest()

# The print statements here are just for showcasing purposes
print(f"Un-hashed: {combined}")
print(f"Hashed: {hashed}")
```

To show that this does what it’s intended to do we can run the PoC:

```plaintext
Un-hashed: kg@T.8qtQ4|1DcIrl#=:H!xO(&*i5>nARY]MvPassword1
Hashed: b8d3e6b4659485f9b2201e6704ecb2af
```

We now have a way of creating strong salted hashes to make sure that the sensitive information is secure.

**NB!** You should always create strong passwords even though a database might store your information with a salted hash.

Now from an attacker's point of view, we might want to create a wordlist containing as many randomly generated salts as we can, to use for cracking salted hashes. We can make some changes to the script above to create a huge wordlist that will store all combinations with 37 characters as an example (**PoC**):

```python
import string
import random
import os

# Creating the character set which includes Aa-Zz, 0-9, and special characters we are going to use to create the salts
charset = list(string.ascii_lowercase) + list(string.ascii_uppercase) + list(string.digits) + list(string.punctuation)

# We create a wordlist of type set to not store any duplicate salts
wordlist = set()

while True:
    # Using the random library we pick a number of elements from the "charset" list
    # The number can be changed depending on how long you want the salt to be
    # If the file specified does not exist then create it, and if it does exist then continue.
    # For every word in the wordlist set add it to the file.
    randomized = random.sample(charset, 37)
    salt = "".join(randomized)
    if os.path.isfile("filename.txt"):
        if salt not in wordlist:
            wordlist.add(salt)
            for id, word in enumerate(wordlist):
                with open("filename.txt", "a") as file:
                    file.write(word)
                    if id < len(wordlist) - 1:
                        file.write("\n")
                file.close()
    else:
        if salt not in wordlist:
            wordlist.add(salt)
            with open("filename.txt", "x") as file:
                file.close()
            for id, word in enumerate(wordlist):
                with open("filename.txt", "a") as file:
                    file.write(word)
                    if id < len(wordlist) - 1:
                        file.write("\n")
                file.close()
```

In a matter of seconds, we should have generated around 1 million+ combinations (**_be careful, it can generate a huge file_**) which we can use to crack salted hashes by combining the salted wordlist with another wordlist containing, for example, common passwords.

This is just for educational purposes, although the example above can be used to crack salted hashes it should be mentioned that it is illegal without explicit permission. This is just some proof of concepts to make people aware that salted hashes are extremely secure, and should be used to store sensitive data.
