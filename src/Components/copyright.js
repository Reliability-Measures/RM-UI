import React from 'react'
import { Link } from 'react-router-dom'

function Copyright() {
    return (
        <p Style={'padding: 10px'}>
            <div className="text-left">
                <div id="main">

                    <h1>About Privacy</h1>
                    <hr></hr>
                    <h2>Privacy Statement for Reliability Measures</h2>
                    <p>The following statements describes the privacy practices
                        for Reliability Measures:</p>
                    <ul>
                        <li>We do not collect any personal information from our
                            users except when a user logins using Google Credentials.
                            We will use Google profile info like given name and email to identify items owned by the user.
                        </li>
                        <li>Visits are logged for aggregate statistics and
                            diagnosis
                        </li>
                        <li>Security settings protect the misuse of sensitive
                            information
                        </li>
                    </ul>
                    <hr></hr>
                    <h2>Personal User Information</h2>
                    <p>Reliability Measures requires no user registration (apart from optional Google login).
                        Users are free to visit Reliability Measures,
                        and navigate all its pages.</p>
                    <hr></hr>
                    <h2>Cookies</h2>
                    <p>Our website uses cookies, like almost all
                        websites. Cookies are small text files that are
                        placed on your computer or mobile phone when
                        you browse websites,
                        to help provide you with the best experience we
                        can.</p>
                    <p>Our cookies help us:</p>
                    <ul>
                        <li>Improve the speed of the site</li>
                        <li>Continuously improve our website for you
                        </li>
                        <li>Allow you to share pages with social
                            networks like Facebook
                        </li>
                        <li>Offer you free services/content (by
                            advertising)
                        </li>
                        <li>Make our marketing more efficient (helping
                            us keep the site free to use)
                        </li>
                    </ul>
                    <p>We do not use cookies to:</p>
                    <ul>
                        <li>Collect any personally identifiable
                            information (without your express
                            permission)
                        </li>
                        <li>Collect any sensitive information (without
                            your express permission)
                        </li>
                        <li>Pay sales commissions</li>
                    </ul>

                    <hr></hr>
                    <h2>Social Website Cookies</h2>
                    <p>Cookies are used by social websites
                        (like Facebook and Twitter) so you can
                        easily
                        Like or share our content with the
                        sharing buttons on our site.</p>
                    <p>The privacy implications on this will
                        vary from the different social websites
                        and
                        are dependent on the privacy settings
                        you have chosen on these networks.</p>
                    <hr></hr>
                    <h2> Visitor Statistics Cookies</h2>
                    <p>We use cookies to compile visitor
                        statistics such as how many people
                        have visited our website, what type
                        of technology they are using (e.g.
                        Mac or Windows which helps to
                        identify when our site isn't
                        working as it should for particular
                        technologies), how long they spend
                        on the site, what page they look at
                        etc.</p>
                    <p>This helps us to continuously
                        improve our website. These
                        analytics programs also tell us if
                        how people reached this site (e.g.
                        from a search engine) and whether
                        they have been here before helping
                        us to put more money into
                        developing our services for you
                        instead of marketing spend. </p>
                    <p>We use:</p>
                    <ul>
                        <li>Google Analytics - <a
                            href="https://www.google.com/policies/technologies/">Privacy
                            Policy</a> owned by Google
                        </li>
                    </ul>
                    <hr></hr>
                    <h2>Advertising Cookies</h2>
                    <p>We don't use any advertisement.</p>
                    <hr></hr>
                    <h2>Advertisements</h2>
                    <p>We may fund our site in future by showing
                        adverts as you browse our
                        site. These adverts are
                        usually managed by a
                        partner specializing in providing
                        adverts for multiple sites.
                        Invariably these partners
                        place cookies to collect
                        anonymous data about the
                        websites you visits so they
                        can
                        personalize the adverts to
                        you, ensure that you don't
                        see the same adverts too
                        frequently and ultimately
                        report to advertisers on
                        which adverts are
                        working.</p>
                    <p>Reliability Measures
                        does not keep for
                        ourselves, or share
                        this information
                        with third
                        parties.</p>
                    <hr></hr>
                    <h2>Links</h2>
                    <p>Reliability
                        Measures
                        contains links
                        to other sites.
                        We are not
                        responsible for
                        the privacy
                        practices or
                        the content of
                        such Web sites.
                        This privacy
                        document
                        applies only to
                        Reliability
                        Measures.</p>
                    <div>
                        <h2>Contacting
                            the Web
                            Site</h2>
                        <p>For any
                            questions
                            about this
                            privacy
                            statement,
                            please
                            contact:</p>
                        <p>info@ReliabilityMeasures.com</p>
                        <br></br>
                       <Link className='nav-link' to='/'>Home</Link>
                    </div>

                </div>
            </div>
        </p>
    )
}

export default Copyright
