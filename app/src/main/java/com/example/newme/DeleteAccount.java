package com.example.newme;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class DeleteAccount extends AppCompatActivity {



        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.delete_decision);

            Button Yes =  findViewById(R.id.Yes);
            Button No = findViewById(R.id.No);

            SharedPreferences saveData = this.getSharedPreferences("com.example.newme.USER_DATA",0);
            //SharedPreferences savedData = this.getPreferences(Context.MODE_PRIVATE);
            final SharedPreferences.Editor userDataEditor = saveData.edit();
            //a sharedPreferences file that will allow us to save user data

            Yes.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    userDataEditor.remove("HomeAddress");
                    userDataEditor.remove("PhoneNumber");
                    userDataEditor.remove("Email");
                    userDataEditor.remove("Pin");
                    userDataEditor.apply();


                    String message = "Your account was deleted";
                    Context context = getApplicationContext();
                    int duration = Toast.LENGTH_LONG;
                    Toast deleteToast = Toast.makeText(context, message, duration);
                    deleteToast.show();


                    Intent profileIntent = new Intent(DeleteAccount.this,SignIn.class);
                    DeleteAccount.this.startActivity(profileIntent);

                }
            });

            No.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    Intent profileIntent = new Intent(DeleteAccount.this, SettingsPage.class);
                    DeleteAccount.this.startActivity(profileIntent);


                }
            });

        }

    }


