
# aChaptar

aChaptar is a free and open source library to protect forms inside your websites from malicious attacts. It is as easy as implementing a few lines of code into your website.

## Implementation

Add into your HTML Form.

```bash
<form id="aCAPTCHA_protected_form">
```
In the action page add (for PHP):

```bash
$aCAPTCHA_data = file_get_contents("https://gnets.myds.me/developer/acaptcha/api/data/?tracking=" . base64_encode($_POST['aCAPTCHA_data']) . "&keyLog=" . base64_encode($_POST['aCAPTCHA_data_keyLog']));
if ($aCAPTCHA_data == "aCAPTCHA_robot_false") {
	//Human detected
} else if ($aCAPTCHA_data == "aCAPTCHA_robot_detected") {
	//Robot detected
} else {
	//Error occured
}
```
    
## Authors

- [Alex Sofonea](https://github.com/Alex05007)


## Support

For support, email alex05.sofonea@gmail.com or tweet at @alex_sofonea.

