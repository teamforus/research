package com.example.newme;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class ProfilePage  extends AppCompatActivity {

    Button scanButton;
    Button profile;
    Button settings_button;
    Button voucher_button;
    TextView Name;
    TextView Email;

    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        setContentView(R.layout.profile_page);

        Name = findViewById(R.id.PPName);
        Email = findViewById(R.id.PPEmail);
        scanButton = findViewById(R.id.QRButton);
        profile = findViewById(R.id.ProfileButton);
        settings_button = findViewById(R.id.SettingsButton);
        voucher_button = findViewById(R.id.VoucherButton);

        SharedPreferences sharedPref = getSharedPreferences("com.example.newme.USER_DATA",0 );
        String first = sharedPref.getString("FirstName","NULL");
        String last = sharedPref.getString("LastName","NULL");
        String email = sharedPref.getString("Email","NULL");
        String NameText = first + " " + last;
        Name.setText(NameText);
        Email.setText(email);



        scanButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent qrIntent = new Intent(ProfilePage.this, QRCode.class);
                ProfilePage.this.startActivity(qrIntent); // startActivity allow you to move
            }
        });

        settings_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent settingsIntent = new Intent(ProfilePage.this, SettingsPage.class);//FIX THIS AFTER SETTINGS DONE
                ProfilePage.this.startActivity(settingsIntent); // startActivity allow you to move
            }
        });

        voucher_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent voucherIntent = new Intent(ProfilePage.this, VoucherActivity.class);
                ProfilePage.this.startActivity(voucherIntent);
            }
        });


    }
}
