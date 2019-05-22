package com.example.newme;

import android.content.Intent;
import android.os.Bundle;
//import android.support.design.widget.FloatingActionButton;
//import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;

public class LoginActivity extends AppCompatActivity {
    //https://developer.android.com/training/basics/firstapp/starting-activity

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sign_in);

        final Button button = findViewById(R.id.create_account);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        button.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LoginActivity.this, MakeAccount.class);
                LoginActivity.this.startActivity(intent); // startActivity allow you to move
            }
        });


    }





//    private boolean signOut(){
//        //once signed out, user will have to manually sign in again
//        //return true for signout
//        Login.signInCheck = true;
//        return true;
//
//    }


}
