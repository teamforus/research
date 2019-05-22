package com.example.newme;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.util.Iterator;

public class SignIn extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sign_in);
        final Button create_button = findViewById(R.id.confirm_button);
        final Button makeAcct_button = findViewById(R.id.create_account);

        create_button.setOnClickListener(new View.OnClickListener() {
            SharedPreferences sharedPref = getSharedPreferences("com.example.newme.USER_DATA",0 );
            @Override
            public void onClick(View v) {
                EditText pin = (EditText)findViewById(R.id.sign_in);
                EditText email = findViewById(R.id.email_text);
                Log.d("logPin",pin.getText().toString());
                //if email and pin are on record
                if(sharedPref.getString("Pin","NULL").equals(pin.getText().toString()) && sharedPref.getString("Email", "NULL").equals(email.getText().toString())){
                    Intent intent = new Intent(SignIn.this, ProfilePage.class);
                    SignIn.this.startActivity(intent);
                }else
                {
                    Log.d("progress", "did not work" + sharedPref.getString("Pin","didn't work"));

                    String newString = "Login Failed";
                    Context context = getApplicationContext();
                    int duration = Toast.LENGTH_LONG;
                    Toast exampleToast = Toast.makeText(context, newString, duration);
                    exampleToast.setGravity(Gravity.CENTER_VERTICAL, 0,-750);
                    exampleToast.show();
                }
            }
        });

        makeAcct_button.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                Intent intent = new Intent(SignIn.this, MakeAccount.class);
                SignIn.this.startActivity(intent);

            }
        });

        //SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(this);





    }

//    public boolean checkSharedPreferences(){
//        //access shared preferences here=====>>>>
//        //Preference Managaer found here:
//        //  https://stackoverflow.com/questions/5946135/difference-between-getdefaultsharedpreferences-and-getsharedpreferences
//        //google docs:
//        //  https://developer.android.com/training/data-storage/shared-preferences
//        //if a user has registered an account then ask for login pin...
//
//        //SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(this);
//        //SharedPreferences sharedPref = this.getPreferences(0);
//        SharedPreferences sharedPref = getSharedPreferences("com.example.newme.USER_DATA",0 );
////        final String getPin = sharedPref.getString("Pin","NULL");
//        if(sharedPref.contains("Pin") && sharedPref.contains("Email")){
//            Log.d("check",sharedPref.getString("Pin","True"));
////            Intent signInIntent = new Intent(MainActivity.this,SignIn.class);
////            SignIn.this.startActivity(signInIntent);
//            return true;
//        }else{
//            Log.d("check","Need Toast \n");
////            Intent needToMakeAccountIntent = new Intent(MainActivity.this,MakeAccount.class);
////            SignIn.this.startActivity(needToMakeAccountIntent);
//        }
//        Log.d("Check Failed",sharedPref.getString("Pin","no val"));
//        return false;
//    }
}
