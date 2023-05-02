<script setup>
import { useRoute } from 'vue-router';

const route=useRoute()
const date=new Date()

const day=date.getDate()
const month=date.getMonth()
const year=date.getFullYear()
let cureentDate=day+"-"+month+"-"+year
</script>

<template>
    <footer v-if="route.name!='notFound'">
        <div class="upper">
            <div class="cont">
                <div class="logo">
                    <img src="../image/5.png" alt="">
                </div>
                <div class="cont-def">
                    <div class="title">
                        <h3>About Us</h3>
                    </div>
                    <div class="cont-desc">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, accusamus nemo deserunt iste aliquid molestias?</p>
                    </div>
                </div>
                <div class="cont-def">
                    <div class="title">
                        <h3>Contact Us</h3>
                    </div>
                    <div class="cont-desc">
                        <ul>
                            <li>
                                <i><img src="../image/email.png" alt=""></i><span class="small">ZengShop@gmail.com</span>
                            </li>
                            <li>
                                <i><img src="../image/phone.png" alt=""></i><span class="small">+251939209166</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="cont">
                <div class="cont-def">
                    <div class="title">
                        <h3>Information</h3>
                    </div>
                    <div class="cont-desc">
                        <ul>
                            <li><a href="#">About Us</a></li>
                        </ul>
                        <ul>
                            <li><a href="#">More Search</a></li>
                        </ul>
                        <ul>
                            <li><a href="#">Blog</a></li>
                        </ul>
                        <ul>
                            <li><a href="#">Testimonials</a></li>
                        </ul>
                        <ul>
                            <li><a href="#">Events</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="cont">
                <div class="cont-def">
                    <div class="title">
                        <h3>Helpful Links</h3>
                    </div>
                    <div class="cont-desc">
                        <ul class="ul">
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Supports</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="cont">
                <div class="cont-def">
                    <div class="title">
                        <h3>Subscription More Info</h3>
                    </div>
                    <form>
                        <div class="form-cont">
                            <i><img src="../image/email.png" alt=""></i>
                            <input type="email" to="natenaelhaylemariam@gmail.com" name="email" placeholder="Enter Your Email" class="footerInput">
                        </div>
                        <div class="form-cont">
                            <div class="button">
                                <input type="submit" name="submit" value="Subscribe" class="footerSubmit">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="lower">
            <div class="links">
                <ul>
                    <li><a href="#"><img src="../image/email.png" alt=""></a></li>
                    <li><a href="#"><img src="../image/facebook.png" alt=""></a></li>
                    <li><a href="#"><img src="../image/linkidin.png" alt=""></a></li>
                    <li><a href="#"><img src="../image/hub.png" alt=""></a></li>
                </ul>
            </div>
            <div class="copyright">
                <span>&copy; {{ cureentDate }} E.C</span>
            </div>
        </div>
    </footer>

</template>