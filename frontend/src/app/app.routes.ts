import { Routes,RouterModule } from '@angular/router';
import { HeaderComponent } from './Component/header/header.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { ChatbotComponent } from './Component/chatbot/chatbot.component';
import { LoginComponent } from './Component/login/login.component';
import { ChatWindowComponent } from './Component/chat-window/chat-window.component';
import { FaqComponentComponent } from './Component/faq-component/faq-component.component';
import { UploadDocumentComponent } from './Component/upload-document/upload-document.component';
import { SigninPageComponent } from './Component/signin-page/signin-page.component';
import { ResetPasswordComponent } from './Component/reset-password/reset-password.component';
import { SettingsComponent } from './Component/settings/settings.component';
import { UserProfileComponent } from './Component/user-profile/user-profile.component';
//import { NewLoginComponent } from './Component/new-login/new-login.component';
import { LoginOauthComponent } from './Component/login-oauth/login-oauth.component';

export const routes: Routes = [
    { path: 'Login', component:LoginComponent},
    { path: 'NewAuthLogin', component:LoginOauthComponent},
    { path: 'SignIn', component:SigninPageComponent},
    { path: 'ResetPassword', component:ResetPasswordComponent},
    { path: '', component: ChatWindowComponent, 
        children:[
            { path: 'dashboard', component: ChatbotComponent },
            { path: 'FAQ', component:FaqComponentComponent},
            { path: 'uploadDoc', component: UploadDocumentComponent },
            { path: 'UserProfile', component: UserProfileComponent },
            { path: 'settings', component: SettingsComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
        ]
    },
    { path: '**', redirectTo: '/dashboard' },
   
  
];
