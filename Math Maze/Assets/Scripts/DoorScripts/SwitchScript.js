#pragma strict

var playerInRange = false;
var displayMessage = false;
var failMessage = false;
var successMessage = false;
var textFieldString : String = "";
var	num1 : int;
var	num2 : int;
var solution : String;
var correctAnswer = false;
var a = SwitchDoor();
var b = SwitchWarning();
var FPC : FirstPersonControl;
var Cam : Camera;
var ml : MouseLook;
var ml2 : MouseLook;
var completed : AudioClip;

function Start ()
{
		collider.enabled = true;
		playerInRange = false;
		displayMessage = false;
		num1 = Random.Range(0,10);
		num2 = Random.Range(0,10);
		solution = (num1+num2).ToString();
		ml = FPC.GetComponent(MouseLook);
		ml2 = Cam.GetComponent(MouseLook);
}

function Update () 
{
	if(playerInRange && correctAnswer)
	{
		a.doorActivate();
		b.disable();
	}
}



function OnTriggerEnter(other:Collider)
{
	if(other.tag == "Player")
	{
		ml.enabled = false;
		ml2.enabled = false;
		playerInRange = true;
		displayMessage = true;
		Screen.showCursor = true;
	}  
}

function OnTriggerExit(other:Collider)
{
	if(other.tag == "Player")
	{
		ml.enabled=true;
		ml2.enabled = true;
		playerInRange = false;
		displayMessage = false;
		Screen.showCursor = false;		
	}
}


function fail()
{
failMessage = true;
yield WaitForSeconds(3);
failMessage = false;
}

function correct()
{
AudioSource.PlayClipAtPoint(completed, transform.position);
successMessage = true;
yield WaitForSeconds(3);
successMessage = false;
}

function OnGUI()
{
if (failMessage)
{
GUI.Label(Rect((Screen.width /2) - 100, (Screen.height / 2) - 100, 200, 200), "Try again.");
}
if (successMessage)
{
GUI.Label(Rect((Screen.width /2) - 100, (Screen.height / 2) - 100, 200, 200), "A door located somewhere else has opened!");
}

        if ( displayMessage )
    {
GUI.Box (Rect ((Screen.width/2)-100, (Screen.height/2)-100,200,200), GUIContent("Question" ));//"External Box"

GUI.Label (Rect (Screen.width/2-50, Screen.height/2-50, 100, 100), "What is " +num1 + " + " + num2 + "?");

textFieldString = GUI.TextField (Rect ((Screen.width/2)-50, Screen.height/2-25, 100,50), textFieldString); // Here if i pass some string in textFieldString which is my var it is displayed in the textfield but then i cannot edit or type the text in my text field.

if (GUI.Button (Rect ((Screen.width/2)-50, (Screen.height/2)+40,100,30), "Submit") ||  Input.GetKeyDown(KeyCode.KeypadEnter))
{
// This code is executed when the Button is clicked
if (textFieldString == solution)
{
correct();
displayMessage = false;
correctAnswer = true;
ml.enabled=true;
ml2.enabled = true;
}
else
{
displayMessage = false;
textFieldString = "";
ml.enabled=true;
ml2.enabled = true;
fail();
}

    }
}
}