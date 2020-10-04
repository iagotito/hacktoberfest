import { viewLogin } from './login.js'
import { viewUserRegister, viewRequestChangePassword, viewChangePassword, viewProfile } from './user.js'
import { viewCampaignRegister } from "./registerCampaign.js";
import { searchCampaigns } from "./listingCampaigns.js";
import { showCampaign } from "./campaign.js";
export { $viewer, url, viewerChange, viewHome, viewCampaign };

let url = 'https://apiajude.herokuapp.com/api';
let $viewer = document.querySelector('#viewer');

window.onload = viewerChange;
window.addEventListener('hashchange', viewerChange);

async function viewerChange() {
    let campaignURL = location.hash.substring(9);
    let profileURL = location.hash.substring(6);
    let hash = location.hash;

    if (['', '#'].includes(hash)) {
        viewHome();
    } else if (['#user-register'].includes(hash)) {
        viewUserRegister();
    } else if (['#login'].includes(hash)) {
        viewLogin();
    } else if (['#campaign-register'].includes(hash)) {
        viewCampaignRegister();
    } else if (['#logout'].includes(hash)) {
        logout();
    } else if (['#reset-password'].includes(hash)) {
        viewChangePassword();
    } else if (['#request-change-password'].includes(hash)) {
        viewRequestChangePassword();
    } else if ([`#campaign${campaignURL}`].includes(hash)) {
        viewCampaign(campaignURL);
    } else if ([`#user/${profileURL}`].includes(hash)) {
        viewProfile(profileURL);
    }
}

function viewHome() {
    generateHeader();

    let $template = document.querySelector('#home-view');
    $viewer.innerHTML += $template.innerHTML;
    $viewer.classList = '';
    searchListener();

    let $receivedCheckbox = $viewer.querySelector("#check-received");
    let $deadlineCheckbox = $viewer.querySelector("#check-deadline");
    let $likeCheckbox = $viewer.querySelector("#check-likes");

    showTop5ByRemaining();
    $receivedCheckbox.addEventListener("change", showTop5ByRemaining);
    $deadlineCheckbox.addEventListener("change", showTop5ByDeadline);
    $likeCheckbox.addEventListener("change", showTop5ByLikes);
}

export function showConfirmView(message) {
    let $div = document.createElement('div');
    let $p = document.createElement('p');
    let $img = document.createElement('img');
    generateHeader();

    $div.className = 'opaque-div flex-box flex-box-justify-center flex-box-align-center flex-box-column';
    $div.id = 'flex-box-column';
    $p.innerText = message;
    $p.style.paddingTop = '1em';
    $img.id = 'attention-img';
    $img.src = 'images/check.svg';
    $img.className = 'img-inverter';

    $div.appendChild($img);
    $div.appendChild($p);
    $viewer.appendChild($div);

    if (message !== "Você agora está cadastrado!") {
        window.setTimeout("location.href = '/'", 800);
    }
}

export function showFailureView(message) {
    let $div = document.createElement('div');
    let $p = document.createElement('p');
    let $img = document.createElement('img');
    generateHeader();

    $div.className = 'opaque-div flex-box flex-box-justify-center flex-box-align-center flex-box-column';
    $div.id = 'flex-box-column';
    $p.innerText = message;
    $p.style.paddingTop = '1em';
    $img.id = 'attention-img';
    $img.src = 'images/fail.svg';
    $img.className = 'img-inverter';

    $div.appendChild($img);
    $div.appendChild($p);
    $viewer.appendChild($div);

    window.setTimeout("location.href = '/'", 800);
}

function logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userEmail');

    window.setTimeout(() => {
        history.replaceState(null, null, "/");
        viewHome();
    }, 0);
}

export function viewHasNoPermission() {
    generateHeader();
    searchListener();
    let $div = document.createElement('div');
    let $p = document.createElement('p');
    let $img = document.createElement('img');

    $div.className = 'opaque-div flex-box flex-box-justify-center flex-box-align-center flex-box-column';
    $div.id = 'flex-box-column';
    $p.innerText = "É necessário realizar login para ter acesso à esse conteúdo...";
    $p.style.paddingTop = '1em';
    $img.id = 'attention-img';
    $img.src = 'images/crying-face.svg';
    $img.className = 'img-inverter';


    $div.appendChild($img);
    $div.appendChild($p);
    $viewer.appendChild($div);
}

export function generateHeader() {
    let $headerTemplate;

    if (sessionStorage.getItem('token') == null) {
        $headerTemplate = document.querySelector("#header-not-logged");
        $viewer.innerHTML = $headerTemplate.innerHTML;
    } else {
        $headerTemplate = document.querySelector("#header-user-logged");
        $viewer.innerHTML = $headerTemplate.innerHTML;
        let $a = document.querySelector('#profile');
        $a.href = `#user/${sessionStorage.getItem('username')}`;
    }
}

function viewCampaign(url) {
    generateHeader();
    showCampaign(url);
}

export function searchListener() {
    let $searchBtn = $viewer.querySelector("#search-btn");
    let $searchInput = $viewer.querySelector("#input-search");
    
    $searchBtn.addEventListener('click', (event) => {
        history.replaceState(null, null, "/");
        searchCampaigns($searchInput.value);
        event.preventDefault();
    });
}

async function showTop5ByRemaining() {
    let campaigns = await fetchTop5Campaigns('remaining');
    generateViewTop5Campaigns(campaigns);
}

async function showTop5ByDeadline() {
    let campaigns = await fetchTop5Campaigns('date');
    generateViewTop5Campaigns(campaigns);
}

async function showTop5ByLikes() {
    let campaigns = await fetchTop5Campaigns('like');
    generateViewTop5Campaigns(campaigns);
}

function generateViewTop5Campaigns(campaigns) {
    let $divTopCampaigns = document.querySelector('#home-list-campaigns');
    $divTopCampaigns.innerHTML = "";

    if (campaigns.length === 0) {
        let $h3 = document.createElement('h3');
        $h3.innerText = 'Não existem campanhas cadastradas ativas!';
        $h3.style.textAlign = 'center';
        $divTopCampaigns.appendChild($h3);
        $divTopCampaigns.className = 'top-campaigns';
    } else {
        campaigns.forEach(c => {
            let campaign = document.createElement('div');
            campaign.className = "top-campaigns";
            campaign.innerHTML =
                `<h3 id="name" style="margin: 0.5em; text-align: center;">${c.shortName.toUpperCase()}</h3>
                <div class="campaign-description">${c.description}</div>
                    <ul class="ul-info flex-box" style="justify-content: space-between; flex-wrap: wrap">
                        <li class="flex-box flex-box-row flex-box-align-center" style="justify-content: space-between;">
                            <img src="images/piggy-bank.svg" title="Meta" width="30px" height="30px" style="margin-right: 0.3em">
                            <p></strong>${c.received}/${c.goal}</strong></p>
                        </li>
                        <li class="flex-box flex-box-row flex-box-align-center" style="justify-content: space-between;">
                            <img src="images/calendar.svg" title="Deadline" width="30px" height="30px" style="margin-right: 0.3em">
                            <p></strong>${c.deadline}</strong></p>
                        </li>
                        </li>
                        <li class="flex-box flex-box-row flex-box-align-center" style="justify-content: space-between;">
                            <img id="img-like" class="img-inverter" src="images/heart.svg" title="Likes" width="30px" height="30px" style="margin-right: 0.3em">
                            <p><strong id ="like">${c.likes}</strong></p>
                        </li>
                        </li>
                            <li class="flex-box flex-box-row flex-box-align-center" style="justify-content: space-between;">
                            <img id="img-dislike" class="img-inverter" src="images/broken-heart.svg" title="Dislikes" width="35px" height="35px" style="margin-right: 0.3em">
                            <p><strong id ="dislike">${c.dislikes}</strong></p>
                        </li>
                        <li> 
                            <a href="#campaign/${c.urlIdentifier}" >Ver mais</a> 
                        </li>
                    </ul>
                </div>`;

            $divTopCampaigns.appendChild(campaign);
        });
    }
}

async function fetchTop5Campaigns(orderBy) {

    let header = {
        'Content-Type': 'application/json;charset=utf-8'
    };

    let response = await fetch(url + `/home/${orderBy}`, {
        'method': 'GET',
        'headers': header
    });

    let campaigns = await response.json();

    return campaigns;
}
