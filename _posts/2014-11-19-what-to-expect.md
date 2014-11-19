---
layout: post
title: What to expect on my git
description: "Just about everything you'll need to style in the theme: headings, paragraphs, blockquotes, tables, code blocks, and more."
modified: 2014-11-19
tags: [sample post]
image:
  feature: abstract-3.jpg
  credit: dargadgetz
  creditlink: http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/
---


FIRST POST YEAH. Summing up some stuff you'll find here in the future...
- [Developing][Developing]
- [WebDeveloping][]
- [Custom Linux][]
- [Screenshot and download][]

Below is just about a tenth of what i'll try to cover in blogs, projects and repositories/demos. But i'll bore you with a little introduction story in my bestest engrish.


### Developing ###

I love developing, or rather, learning and applying new techniques. But it also gives me a headache from time to time. I'll try to explain.

Web-development is probably my main interest.. not completely sure though, cause i enjoy writing c# (kerbal space program mods!) or java (minecraft server plugins) just as much.

The tricky part though is web-development. C#, Java, etc (dependable on the scale of the project) are evolving much slower then the web-development languages and techniques are (note: that's just my assumption, feel free to correct me).

Web-development these days requires a multitude of toolkits and languages which are constantly changing, but also very project dependend.

HTML, CSS, PHP. That's what was acceptable a few years ago. No pre-processors, build-tools (phing, grunt) etc. Javascript was just <insert jQuery + plugin + config> and voila.

Nowadays, i can't even imagine only working like that. Obviously, it might very well indicate i've just haven't had the right knowledge back then (or now aswell for that matter).

### WebDeveloping ###
**Example workflow**

- Open up a terminal, or maby 2/3 for some proper multitasking.
- Initialize npm, bower, grunt. Fix .gitignore, .jshintrc. Heck, add license and readme while your at it.
- Start configuring a config file, make it integrate into gruntfile.
- Fix all required grunt modules, maby some other node stuff that's usefull.
- Oh yeah, pick ur backend framework/language.. node/express? php/laravel? c#/.NET?
- Yeah lets implement latest tech, gonna go full RESTfull with some fancy AngularJS? Or fancy Meteor's approach?

Problem is, the client (project requirements) really decides on it. Sometimes it's simply not worth the workload, or simply doesn't suit the project's nature.

But let's continue for laughs.

Youd need to pre-process SCSS or LESS. You'd need to fix bower properly (wiredep? usemin? preprocess?), whatever. I've played around with grunt/bower and finally gave up on it. Meaning i spend to much time learning NodeJS, the Grunt API, Testing libs like karma and whatnot.

Now the silly thing of all is that the time-investment to properly do some front-end developing screws up my back-end developing interests. I'm very happy with the way PHP is moving the last couple of years.. composer, laravel, packagist.. all sweet stuff.

Il now get to the point im trying to make clear, as web-developer you simply require multiple skills:

- NodeJS/Javascript for server side
- Javascript for client side (try creating a fancy big library that actually works on all browsers... love IE!)
- Windows are objects to look trough. Apples are nasty things you eat. You'd really want to have Tux the pinguin. (in other words, make sure u do your web-development on linux. If you can code but still use windows, invest the time to make it your main OS!)
- HTML5, Bootstrap, CSS3. Sure, all nice. Try it in IE7 after you've created your awesome site. It's depressing.
- jQuery, Underscore, AngularJS, native JS.. It's pretty common to know all of them (though jq/underscore are quite simply api's/library of function). I admit i've had no experience with javascript (client site) for over 2 years of simple jQuery usage.
- Build tools. Pre-processors, Generators. A proper toolkit to automate tasks and not lose your sanity by repeating. Sure, BASH scripts can carry you a long way, i use em every project. But i can promise you that creating your own Yeoman, grunt, or whatever generator for several tasks is worth the time investment. Here's a preview of one of my generators.

![radic gitinit](https://raw.githubusercontent.com/RobinRadic/radic-cli/master/wizard2.jpeg). Pretty much all questions are already filled in properly by default. How much times haven't you done:

{% highlight Bash %}
git init
touch .gitignore
echo -e "/node_modules \n /vendor \n /whatevaah" >> .gitignore
touch LICENSE
touch README.md
chromium http:///github.com # and then click click click to create a new repo...
git add -A
git commit -m "shit, im doing this again...."
git push -u origin master
{% endhighlight %}

(Btw, if you like the prompt

Imagine just doing this:
{% highlight bash %}
radic gitinit
[enter]
[enter]
[enter]
[enter]
[enter]
myawesomeproject
[enter]
[enter]
[enter]
# Done...
{% endhighlight %}

Or even better:
{% highlight bash %}
radic init [project type]
Myy awesome project # project name
y # yes to gitinit it
# maby 2/3 more questions to adjust the resulting project files
{% endhighlight %}

And the result? (php/laravel with front-end stuffz)

{% highlight bash %}
root
 .git
 app
 packages
 workbench
   mypackage
     public
       super.scss
       index.jade
 vendor
 public
   assets
 .bowerrc
 bower.json
 gruntfile.js
 package.json
 LICENSE
 README.md
 .gitignore
 .npmignore
 .jshintrc
 _config.yml
 ...etc etc
{% endhighlight %}
With having all sorts of grunt tasks/plugins ready to easy your workflow. `grunt:watch` fixing all copy, pre-processing, etc from your workbench into public folder. Automaticly including bower installed packages into your html/jade.

My goal is to blog quite a bit about fancy techniques, create some fast and easily readable tutorials, and obviously create some projects/packages for these kind of stuff (and other things as well).


### Custom Linux ###
I'm planning on creating a fair ammount of posts about using `kiwi` comined with `obs` (open build system) and rebranding SUSE by git cloning their `openSUSE/branding` repository. I've learned quite a bit doing it all from scratch. You could check out my repo's, though they aren't that usefull, cause i haven't really updated em. I've waited for 13.2 release, so il be starting from scratch pretty soon.

What does that mean?
- Comlete customized linux version. From boot logo/test, startup animation and KDE customisation. SUSE has all it's source gfx on git. And it's fairly easy to put it online in a repository with RPMS.
- Kiwi allows you to hand-pick every single package, and it requires a bit of config here and there. You can make live USB/CD's with your own rebranded linux.

Link to my outdated 13.1 branding [build service](https://build.opensuse.org/package/show/home:radic:RadicOS/branding-RadicOS) and [repository](http://download.opensuse.org/repositories/home:/radic:/RadicOS/openSUSE_13.1/).
Yeah.. openSUSE actually provides **free** repository online for your packages. [And with the git branding repository](https://github.com/openSUSE/branding/tree/13.2), they got a makefile and .spec file making it child's play to put it on.

You'd just need to invest a bit of time learning how to use Inkscape to create (copy/paste from websites providing vector images for free) some fancy graphix. Adobe illustrator should work aswell.. but then your either on Windows or Crapple ;)

Full details soon!

Here's an example of a kiwi xml file. EZ PZ


{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<image

         schemaversion="5.8" name="RadicOS">
    <!-- xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="kiwi.xsd" xsi:schemaLocation="http://www.w3.org/2001/XMLSchema-instance kiwi.xsd"
       -->
    <!-- improved, x11, yast, kde, software -->
    <description type="system">
        <author>Robin Radic</author>
        <contact>robin@radic.nl</contact>
        <specification>
            RadicOS
        </specification>
    </description>
    <profiles>
        <profile name="improved" description="a"/>
        <profile name="x11" description="a"/>
        <profile name="yast2" description="a"/>
        <profile name="kde" description="a"/>
        <profile name="software" description="a"/>
        <profile name="webdev" description="a"/>
        <profile name="dev" description="a"/>
        <profile name="workstation" description="a"/>
        <profile name="javadev" description="a"/>
        <profile name="webserver" description="a"/>
    </profiles>

    <preferences>
        <version>1.13.1</version>
        <packagemanager>zypper</packagemanager>
        <locale>en_US</locale>
        <keytable>us.map.gz</keytable>
        <timezone>Europe/Amsterdam</timezone>
        <hwclock>utc</hwclock>
        <rpm-excludedocs>true</rpm-excludedocs>
        <bootsplash-theme>RadicOS</bootsplash-theme>
        <bootloader-theme>RadicOS</bootloader-theme>

        <type image="vmx" filesystem="ext4" boot="boot/vmxboot" bootloader="grub2" format="vmdk">
            <machine memory='5512' arch='x86_64' guestOS='suse-64'>
                <vmdisk controller="scsi" id="0"/>
                <vmnic driver="e1000" interface="0" mode="bridged"/>
            </machine>
            <size unit='M' additive='false'>26624</size>
        </type>
        <type image="oem" installstick='true' filesystem="ext4" boot="oemboot/suse-13.1" bootloader="grub2" >
            <!--<systemdisk name="systemVG">
                <volume name="var" size="100000M"/>
                <volume name="usr" size="200000M"/>
                <volume name="home" size="200000M"/>
            </systemdisk>-->
            <oemconfig>
                <oem-swap>true</oem-swap>
                <oem-swapsize>8096</oem-swapsize>
                <oem-systemsize>230000</oem-systemsize>
            </oemconfig>
            <machine memory="2512" guestOS="suse" HWversion="4">
                <vmdisk controller="scsi" id="0"/>
                <vmnic driver="e1000" interface="0" mode="bridged"/>
            </machine>
        </type>
        <type image='iso' hybridpersistent="true" filesystem="ext4" boot='isoboot/suse-13.1' bootloader='grub2' fsnocheck='true' flags='clic' hybrid='true' kernelcmdline='quiet' firmware="efi">
            <split>
                <persistent>
                    <file name='/var'/>
                    <file name='/var/*'/>
                    <file name='/etc'/>
                    <file name='/etc/*'/>
                    <file name='/home'/>
                    <file name='/home/*'/>
                </persistent>

                <temporary>
                    <file name='/tmp'/>
                    <file name='/tmp/*'/>
                </temporary>
            </split>
            <size unit='M' additive='false'>26624</size>
        </type>
    </preferences>


    <users group="root">
        <user password="$6$cUZcBdK84W/x$fWzMpPvglhcrpgyeCU8xs6uOjaA9grmgkwLrPK.t6rnIHRZk1dqFyeRuoBjdbt9u5XeMzGGobPqq28JXsO3zF." home="/root" name="root"/>
    </users>
    <users group="users">
        <user password="$6$cUZcBdK84W/x$fWzMpPvglhcrpgyeCU8xs6uOjaA9grmgkwLrPK.t6rnIHRZk1dqFyeRuoBjdbt9u5XeMzGGobPqq28JXsO3zF." home="/home/radic" name="radic"/>
    </users>

    <!-- REPOSITORIES -->
    <repository type="rpm-md">
        <source path="opensuse://home:radic/openSUSE_13.1/"/>
    </repository>
    <repository type="rpm-md">
        <source path="opensuse://home:radic:RadicOS/openSUSE_13.1/"/>
    </repository>
    <repository type="rpm-md">
        <source path="opensuse://home:radic:mono/openSUSE_13.1/"/>
    </repository>
    <repository type="rpm-md">
        <source path="opensuse://home:radic:webserver/openSUSE_13.1/"/>
    </repository>

    <repository type="yast2">
        <source path="obs://13.1/repo/oss"/>
    </repository>
    <repository type="yast2">
        <source path="obs://13.1/repo/non-oss"/>
    </repository>
    <repository type="rpm-md">
        <source path="opensuse://update/13.1/"/>
    </repository>
    <repository type="rpm-md">
        <source path="opensuse://server:/database/openSUSE_13.1/"/>
    </repository>

    <!-- TYPE SPECIFIK -->
    <packages type="bootstrap">
        <package name="udev"/>
        <package name="filesystem"/>
        <package name="glibc-locale"/>
        <package name="cracklib-dict-full"/>
        <package name="ca-certificates"/>
        <package name="module-init-tools"/>
        <package name="timezone"/>
    </packages>
    <packages type="delete">
        <package name="kernel-debug"/>
    </packages>


    <!-- BASE
        -->
    <packages type="image">
        <package name="kernel-desktop" arch="x86_64" />
        <package name="grub2-branding-RadicOS" bootinclude="true"/>
        <package name="plymouth-branding-RadicOS" bootinclude="true"/>
        <package name="gfxboot-branding-RadicOS" bootinclude="true" bootdelete="true"/>
        <package name="grub2"/>

        <package name="plymouth"/>
        <namedCollection name="base"/>
        <opensuseProduct name="openSUSE"/>
        <package name="ifplugd"/>
        <package name="iputils"/>
        <package name="vim"/>
        <package name="syslinux"/>
        <package name="lvm2"/>
        <!--
        -->
        <package name="fontconfig"/>
        <package name="fonts-config"/>

        <package name="parted"/>

        <package name="open-vm-tools"/>
    </packages>


    <!-- IMPROVED -->
    <packages type="image" profiles="improved">
        <namedCollection name="enhanced_base"/>
        <package name="tar"/>
        <package name="xdotool"/>
        <package name="nano"/>
        <package name='SuSEfirewall2'/>
        <package name='soprano-backend-virtuoso'/>
        <package name="sudo"/>
        <package name="wget"/>
        <package name="ntfs-3g"/>
        <package name="ntfsprogs"/>

        <package name="java-1_7_0-openjdk"/>
        <package name="samba"/>
        <package name="samba-client"/>
        <package name="cifs-utils"/>
        <package name="rsync"/>
        <package name="inotify-tools"/>
        <package name="GraphicsMagick"/>

        <namedCollection name="webyast"/>
    </packages>


    <!-- YAST -->
    <packages type="image" profiles="improved,yast2">
        <!-- <namedCollection name="yast2_basis"/>
        <namedCollection name="yast2_install_wf"/>
        <package name="yast2-installation"/>
        <package name="yast2-sysconfig"/>
        <package name="yast2-users"/>
        <package name="yast2-network"/>
        <package name="yast2-control-center-qt"/>
        <package name="yast2-qt-branding-RadicOS"/>
        <package name="yast2-metapackage-handler"/>
        <package name="yast2-add-on-creator"/>
        <package name="yast2-runlevel"/>
        <package name="yast2-schema"/>
        <package name="ntp"/>
        <package name='yast2-x11'/>
        <package name="autoyast2"/>
        <package name="autoyast2-installation"/>
        <package name='yast2-firstboot'/>
        <package name='yast2-live-installer'/>-->
        <package name='yast2-firstboot'/>
        <package name='yast2-qt-branding-RadicOS'/>
        <package name='yast2-theme-openSUSE'/>
        <package name='yast2-users'/>
        <package name='yast2-firewall'/>
        <package name='yast2'/>
        <package name='yast2-control-center-qt'/>
    </packages>


    <!-- X11 -->
    <packages type="image" profiles="x11,kde">
        <namedCollection name="x11"/>
        <package name="xkeyboard-config"/>
        <package name="xorg-x11-libX11-ccache"/>
        <package name="xorg-x11-xauth"/>
        <package name="xterm"/>
        <package name="xinit"/>
        <package name="xorg-x11-server"/>
        <package name="xorg-x11-driver-input"/>
        <package name="xorg-x11-driver-video"/>
        <package name="xorg-x11-driver-video-nouveau"/>
        <package name="xorg-x11-essentials"/>
        <package name="xorg-scripts"/>
        <package name='dbus-1-x11'/>
        <package name='icewm'/>
        <package name='x11-tools'/>
        <package name='xf86-video-modesetting'/>
        <package name='xorg-x11'/>
        <package name="open-vm-tools-gui"/>
        <package name="xf86-video-vmware"/>
        <package name="xf86-input-vmmouse"/>

        <package name="xorg-x11-fonts"/>
        <namedCollection name="fonts"/>
        <package name="fontconfig"/>
        <package name="fonts-config"/>
        <package name="texlive-sourcecodepro-fonts"/>


        <archive name="profiles/x11.tar.gz"/>
    </packages>


    <!-- KDE -->
    <packages type="image" profiles="kde">
        <namedCollection name="kde4"/>
        <namedCollection name="kde4_basis"/>
        <namedCollection name="apparmor"/>

        <package name="wallpaper-branding-RadicOS"/>
        <package name="kdm-branding-RadicOS"/>
        <package name="kdelibs4-branding-RadicOS"/>
        <package name="ksplash-qml-branding-RadicOS"/>
        <package name="ksplashx-branding-RadicOS"/>
        <package name="susegreeter-branding-RadicOS"/>

        <package name="qtcurve-kde4"/>
        <package name="qtcurve-gtk2"/>
        <package name="qtcurve-gtk2-32bit"/>

        <package name="k3b"/>
        <package name="kdm"/>
        <package name="ksystemlog"/>
        <package name="kdialog"/>
        <package name="konsole"/>
        <package name="kate"/>
        <package name="ark"/>
        <package name="kmix"/>
        <package name="yakuake"/>

        <archive name="profiles/kde.tar.gz"/>
    </packages>


    <!-- GRAPHICAL SOFTWARE -->
    <packages type="image" profiles="software">
        <namedCollection name="imaging"/>
        <namedCollection name="multimedia"/>
        <namedCollection name="non_oss"/>
        <namedCollection name="office"/>
        <namedCollection name="sw_management"/>


        <package name="parted"/>
        <package name="peazip"/>
        <package name="vlc"/>
        <package name="chromium"/>
        <package name="flash-player"/>
        <package name="flash-player-kde4"/>
        <package name="amarok"/>
        <package name="imagewriter"/>
        <package name="qbittorrent"/>
        <package name="gwenview"/>
        <package name="gparted"/>

        <archive name="profiles/software.tar.gz"/>
    </packages>

    <packages type="image" profiles="workstation">
        <package name="libreoffice"/>
        <package name="libreoffice-writer"/>
        <package name="libreoffice-math"/>
        <package name="libreoffice-kde4"/>
        <package name="libreoffice-draw"/>
        <package name="libreoffice-calc"/>
        <package name="libreoffice-languagetool"/>
        <package name="libreoffice-languagetool-nl"/>

    </packages>
    <packages type="image" profiles="webdev,dev">


        <package name="yast2-http-server"/>
        <package name="mysql-workbench"/>
        <archive name="profiles/webdev.tar.gz"/>

        </packages>

    <packages type="image" profiles="webserver,webdev,dev">
        <package name="python-pip"/>
        <package name="git"/>
        <package name="php5"/>
        <package name="php5-pgsql"/>
        <package name="php5-phar"/>
        <package name="php5-shmop"/>
        <package name="php5-snmp"/>
        <package name="php5-sockets"/>
        <package name="php5-sqlite"/>
        <package name="php5-tidy"/>
        <package name="php5-tokenizer"/>
        <package name="php5-xmlreader"/>
        <package name="php5-xmlwriter"/>
        <package name="php5-xsl"/>
        <package name="php5-zip"/>
        <package name="php5-zlib"/>
        <package name="php5-bcmath"/>
        <package name="php5-bz2"/>
        <package name="php5-calendar"/>
        <package name="php5-ctype"/>
        <package name="php5-curl"/>
        <package name="php5-dba"/>
        <package name="php5-devel"/>
        <package name="php5-dom"/>
        <package name="php5-exif"/>
        <package name="php5-fileinfo"/>
        <package name="php5-ftp"/>
        <package name="php5-gd"/>
        <package name="php5-gettext"/>
        <package name="php5-gmp"/>
        <package name="php5-iconv"/>
        <package name="php5-imap"/>
        <package name="php5-json"/>
        <package name="php5-ldap"/>
        <package name="php5-mbstring"/>
        <package name="php5-mcrypt"/>
        <package name="php5-mysql"/>
        <package name="php5-odbc"/>
        <package name="php5-openssl"/>
        <package name="php5-pdo"/>
        <package name="php5-pear"/>

        <package name="php5-xdebug"/>
        <package name="php5-phalcon"/>
        <package name="php5-mongo"/>
        <package name="php5-imagick"/>
        <package name="php5-geoip"/>
        <package name="php5-opcache"/>
        <package name="php5-memcached"/>
        <package name="php5-memcache"/>


        <package name="mysql-community-server"/>
        <package name="mysql-community-server-client"/>
        <package name="mysql-community-server-errormessages"/>
        <package name="mysql-community-server-tools"/>
        <package name="apache2"/>
        <package name="apache2-devel"/>
        <package name="apache2-doc"/>
        <package name="apache2-utils"/>
        <package name="apache2-mod_php5"/>
        <package name="apache2-mod_pagespeed"/>

    </packages>

    <packages type="image" profiles="dev">
        <package name="monodevelop-opt"/>

        <archive name="profiles/dev.tar.gz"/>
    </packages>

    <packages type="image"  profiles="desktop-minimal,desktop-full">

# software
- vlc, amarok, Kmix
- suse studio imagewriter, ktorrent, spotlite, skype
- inotify-tools
- gwenview

# workstation
- python, pip, php, apache, mysql, workbench
- firefox, gparted, vmware
- inkscape, libreoffice
- intellij 13, phpstorm8, pycharm, mono develop, sublime text,mono c#

    </packages>

    <packages type="image"   profiles="desktop-full">

    </packages>




</image>
{% endhighlight %}
{% highlight bash %}
#!/bin/bash

rdir=$PWD
destdir=/home/radic/radicos/result
rootdir=/home/radic/radicos/root
profiles="improved yast2 webserver kde software dev workstation"
verbose=1


function Start {
    if [ $verbose == 1 ]; then
        echo "| $1"
    fi
}

function Info {
    if [ $verbose == 1 ]; then
        echo "|-----> $1 "
    fi
}

function Error {
    echo -e "| \e[91mERROR\e[39m $1"
}

function Done {
    echo -e "| \e[92mDONE\e[39m $1"
}

function _isdir {
    if [ -d $1 ]; then
        return 0
    else
        return 1
    fi
}

_tarzip_profiles() {
    Start "Tarring profile directories"
    cd $rdir/build/profiles
    for PDIR in *; do
        cd $rdir/build/profiles
        if _isdir $PDIR; then
            Info "Found directory: ${PDIR}"
            cd $PDIR
            tar -zcf ../${PDIR}.tar.gz ./
            Info "Created ${rdir}/kiwi/profiles/${PDIR}.tar.gz"
        else
            Info "Skipping ${PDIR}"
        fi
    done
    Done "Tarring profile directories"
    cd $rdir
}

_clean_tarzip_profiles() {
    Start "Clearing tared profiles"
    cd $rdir/build/profiles
    for PDIR in *; do
        cd $rdir/build/profiles
        if ! _isdir $PDIR; then
            Info "Removing non-directory item: $PDIR"
            rm $PDIR
        fi
    done
    Done "Clearing tared profiles"
    cd $rdir
}

prepare() {
    Start "Preparing build"
    sudo rm -rf $rootdir
    sudo rm -rf $destdir
    mkdir -p $rootdir
    mkdir -p $destdir

    _tarzip_profiles

   # if ! _isdir /mnt/radicos/bin; then
   #     Error "mount dc first"
   #     exit 1;
   # fi


    local command="sudo kiwi --prepare $rdir/build --root $rootdir"
    for profile in $profiles; do
        command="$command --add-profile $profile"
    done
    eval $command


    _clean_tarzip_profiles
    Done "Preparing build"

    notify-send "radicos prepare is done"
}


create() {
    Start "Creating build"
    local type=$1
    local command="sudo kiwi --create $rootdir --type $type -d $destdir"
    for profile in $profiles; do
        command="$command --add-profile $profile"
    done

    sudo cp -rf /radicos/{bin,doc,lib,radicos.conf} $rootdir/radicos

    eval $command
    sudo chown radic:users $destdir/*

    Done "Creating build"
    notify-send "radicos create is done"
}

boot() {
    local action=$1
    local image=$2;
    local profiles="default"
    local prepare="sudo kiwi --prepare $rdir/build/boot/$image --root $rdir/bootimg/$image/root"
    local create="sudo kiwi --create $rdir/bootimg/$image/root -d $rdir/bootimg/$image"

    for profile in $profiles; do
        prepare="$prepare --add-profile $profile"
        create="$create --add-profile $profile"
    done



    if [ $action == "prepare" ]; then
        sudo rm -rf $rdir/bootimg/$image
        mkdir -p $rdir/bootimg/$image
        eval $prepare
    elif [ $action == "create" ]; then
        eval $create
    fi


    notify-send "build $action is done"
}

installer() {
    mkdir -p $rdir/installer/tmpcd
    cp -rvf $rdir/installer/original-unpacked/* $rdir/installer/tmpcd/
    cp -rvf $rdir/installer/data/* $rdir/installer/tmpcd/

    echo "done, do makeSUSEdvd -C"
}

installergo() {
    makeSUSEdvd -t

}
installerold() {
    local instsys=$rdir/installer-image/images/instsys
    cd $rdir
    mkdir $rdir/installer
    cp -rf $instsys/branding/openSUSE/CD1/* $rdir/installer/
    cp -rf $instsys/CD1/* $rdir/installer/

    mkisofs -o installer.iso \
       -b boot/x86_64/loader/isolinux.bin \
       -c boot/x86_64/loader/boot.cat \
       -no-emul-boot -boot-load-size 4 -boot-info-table -R -J -v -T \
       installer
}

$*
{% endhighlight %}


### Screenshot and download ###
It's just 2 snippets from my project. But it allows me to create several re-branded distro's entirely with my own pick of packages and custom software.

Can make a Virtual Machine disk, Live USB/DVD, Persistent usb. Simple installer and i'm working on getting the official opensuse DVD installation working properly, with my own branding and packages/products etc.

The cool thing about the branding stuff with SVG files is that they scale. There's not really that much need to alter 100 graphihc files. The makefile that is included does it all (check the repo of openSUSE/branding).

I've still spend quite some time on some stuff. Like ksplashx with QML. It's the animation that u get after login.  I've included it for download, it's quite fancy, just requires a bit of resolution tweaking.

First, the logo and backkground:


![radic gitinit]({{ site_url }}/images/RadicOS131-1920x1200.jpg). Pretty much all questions are already filled in properly by default. How much times haven't you done:


And you can grab the [animation files and QML code here]({{ site_url }}/images/ksplashx.zip). Sorry no video.. But its great to cheat from and adept into your own ksplashxQML intro...