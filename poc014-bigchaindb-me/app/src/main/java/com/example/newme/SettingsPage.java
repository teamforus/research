package com.example.newme;


import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.app.AlertDialog;
import android.content.DialogInterface;

public class SettingsPage  extends LoginActivity {


    Button scanButton;
    Button profile;
    Button settings_button;
    Button Delete_Account;
    Button Logout;
    Button Confirm_Changes;

    EditText Home_Address;
    EditText Phone_Number;
    EditText Change_Email;
    EditText Change_PIN;


    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);


        SharedPreferences saveData = this.getSharedPreferences("com.example.newme.USER_DATA",0);
        //SharedPreferences savedData = this.getPreferences(Context.MODE_PRIVATE);
        final SharedPreferences.Editor userDataEditor = saveData.edit();
        //a sharedPreferences file that will allow us to save user data



        //Buttons
        scanButton = findViewById(R.id.SQR);
        profile = findViewById(R.id.SProfile);
        settings_button = findViewById(R.id.SSettings);
        Delete_Account = findViewById(R.id.SDeleteAccount);
        Logout = findViewById(R.id.SLogout);
        Confirm_Changes = findViewById(R.id.SComfirm_Changes);

        //Edit Text
        Home_Address = findViewById(R.id.SHome_Address);
        Phone_Number = findViewById(R.id.SPhone_Number);
        Change_Email = findViewById(R.id.SChange_Email);
        Change_PIN = findViewById(R.id.SChange_PIN);


        String ha = saveData.getString("HomeAddress","NULL");
        String pn = saveData.getString("PhoneNumber","NULL");
        Home_Address.setText(ha);
        Phone_Number.setText(pn);




        scanButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent qrIntent = new Intent(SettingsPage.this, QRCode.class);
                SettingsPage.this.startActivity(qrIntent); // startActivity allow you to move
            }
        });

        profile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent profileIntent = new Intent(SettingsPage.this,ProfilePage.class);
                SettingsPage.this.startActivity(profileIntent);
            }
        });

        Delete_Account.setOnClickListener(new View.OnClickListener() { // come back to this when BigDB is working
            @Override
            public void onClick(View v) {
                Intent profileIntent = new Intent(SettingsPage.this,DeleteAccount.class);
                SettingsPage.this.startActivity(profileIntent);

            }
        });

        Logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent profileIntent = new Intent(SettingsPage.this,SignIn.class);
                SettingsPage.this.startActivity(profileIntent);
            }
        });

        Confirm_Changes.setOnClickListener(new View.OnClickListener() {

            String finalString = "Changes were made to:";

            @Override
            public void onClick(View v) {
                String home = Home_Address.getText().toString();
                String phone = Phone_Number.getText().toString();
                String email = Change_Email.getText().toString();
                String pin = Change_PIN.getText().toString();


                if (!home.equals("")) {
                   // userDataEditor.remove("HomeAddress");
                    userDataEditor.putString("HomeAddress", home);
                    userDataEditor.apply();
                    finalString += " Home Address, ";

                }
                if (!phone.equals("")) {
                   // userDataEditor.remove("PhoneNumber");
                    userDataEditor.putString("PhoneNumber", phone);
                    userDataEditor.apply();
                    finalString += " Phone Number, ";
                }
                if (!email.equals("")) {
                   // userDataEditor.remove("Email");
                    userDataEditor.putString("Email", email);
                    userDataEditor.apply();
                    finalString += " Email Address, ";

                }
                if (!pin.equals("")) {
                    //userDataEditor.remove("Pin");
                    userDataEditor.putString("Pin", pin);
                    userDataEditor.apply();
                    finalString += " PIN ";
                }

                if (finalString.equals("Changes were made to:")) {
                    String newString = "No changes were made.";
                    Context context = getApplicationContext();
                    int duration =Toast.LENGTH_LONG;
                    Toast exampleToast = Toast.makeText(context, newString, duration);
                    exampleToast.show();
                }
                else {
                    Context context = getApplicationContext();
                    int duration = Toast.LENGTH_LONG;
                    Toast newToast = Toast.makeText(context, finalString, duration);
                    newToast.show();
                }

            }

        });

    }
}
