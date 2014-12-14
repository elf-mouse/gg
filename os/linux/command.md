<h1>Unix/Linux Command Reference</h1>
<dl>
    <dt>File Commands</dt>
    <dd><b>ls</b> - directory listing</dd>
    <dd><b>ls -al</b> - formatted listing with hidden files</dd>
    <dd><b>cd dir</b> - change directory to dir</dd>
    <dd><b>cd</b> - change to home</dd>
    <dd><b>pwd</b> - show current directory</dd>
    <dd><b>mkdir dir</b> - create a directory dir</dd>
    <dd><b>rm file</b> - delete file</dd>
    <dd><b>rm -r dir</b> - delete directory dir</dd>
    <dd><b>rm -f file</b> - force remove file</dd>
    <dd><b>rm -rf dir</b> - force remove directory dir *</dd>
    <dd><b>cp file1 file2</b> - copy file1 to file2</dd>
    <dd><b>cp -r file1 file2</b> - copy dir1 to dir2; create dir2 if it donesn't exist</dd>
    <dd><b>mv file1 file2</b> - rename or move file1 to file2 if file2 is an existing directory, moves file1 into directory file2</dd>
    <dd><b>ln -s file link</b> - create symbolic link link to file</dd>
    <dd><b>touch file</b> - create or update file</dd>
    <dd><b>cat > file</b> - places standard input into file</dd>
    <dd><b>more file</b> - output the contents of file</dd>
    <dd><b>head file</b> - ouput the first 10 lines of file</dd>
    <dd><b>tail file</b> - output the last 10 lines of file</dd>
    <dd><b>tail -f file</b> - output the contents of file as it grows, starting with the last 10 lines</dd>
    <dt>Process Management</dt>
    <dd><b>ps</b> - dirplay your currently active processes</dd>
    <dd><b>top</b> - display all running processes</dd>
    <dd><b>kill pid</b> - kill process id pid</dd>
    <dd><b>killall proc</b> - kill all processes named proc *</dd>
    <dd><b>bg</b> - lists stopped or background jobs; resume a stopped job in the background</dd>
    <dd><b>fg</b> - brings the most recent job to foreground</dd>
    <dd><b>fg n</b> - brings job n to the foreground</dd>
    <dt>File Permissions</dt>
    <dd>
        <b>chmod octal file</b> - change the permissions of file to octal, which can be found separately for user, group, and world by adding:
        <ul>
            <li>4 - read (r)</li>
            <li>2 - write (w)</li>
            <li>1 - execute (x)</li>
        </ul>
    </dd>
    <dd><b>chmod 777</b> - read, write, execute for all</dd>
    <dd><b>chomo 755</b> - rwx for owner, rx for group and world</dd>
    <dt>SSH</dt>
    <dd><b>ssh user@host</b> - connect to host as user</dd>
    <dd><b>ssh -p port user@host</b> - connect to host on port port as user</dd>
    <dd><b>ssh-copy-id user@host</b> - add your key to host for user to enable a keyed or passwordless login</dd>
    <dt>Searching</dt>
    <dd><b>grep pattern files</b> - search for pattern in files</dd>
    <dd><b>grep -r pattern dir</b> - search recursively for pattern in dir</dd>
    <dd><b>command | grep pattern</b> - search for pattern in the output of command</dd>
    <dd><b>locate file</b> - find all instances of file</dd>
    <dt>Systom Info</dt>
    <dd><b>date</b> - show the current date and time</dd>
    <dd><b>cal</b> - show this month's calendar</dd>
    <dd><b>uptime</b> - show current uptime</dd>
    <dd><b>w</b> - display who is online</dd>
    <dd><b>whoami</b> - who you are logged in as</dd>
    <dd><b>finger user</b> - display information about user</dd>
    <dd><b>uname -a</b> - show kernel information</dd>
    <dd><b>cat /proc/cpuinfo</b> - cpu information</dd>
    <dd><b>cate /proc/meminfo</b> - memory information</dd>
    <dd><b>man command</b> - show the manual for command</dd>
    <dd><b>df</b> - show disk usage</dd>
    <dd><b>du</b> - show directory space usage</dd>
    <dd><b>free</b> - show memory and swap usage</dd>
    <dd><b>whereis app</b> - show possible locations of app</dd>
    <dd><b>which app</b> - show which app will be run by default</dd>
    <dt>Compression</dt>
    <dd><b>tar cf file.tar files</b> - create a tar named file.tar containing files</dd>
    <dd><b>tar xf file.tar</b> - extract the files from file.tar</dd>
    <dd><b>tar czf file.tar.gz files</b> - create a tar with Gzip compression</dd>
    <dd><b>tar xzf file.tar.gz</b> - extract a tar using Gzip</dd>
    <dd><b>tar cjf file.tar.bz2 files</b> - create a tar with Bzip2 compression</dd>
    <dd><b>tar xjf file.tar.bz2</b> - extract a tar using Bzip2</dd>
    <dd><b>gzip file</b> - compresses file and renames it to file.gz</dd>
    <dd><b>gzip -d file.gz</b> - decompresses file.gz back to file</dd>
    <dt>Network</dt>
    <dd><b>ping host</b> - ping host and output results</dd>
    <dd><b>whois domain</b> - get whois information for domain</dd>
    <dd><b>dig domain</b> - get DNS information for domain</dd>
    <dd><b>dig -x host</b> - reverse lookup host</dd>
    <dd><b>wget file</b> - download file</dd>
    <dd><b>wget -c file</b> - continue a stopped download</dd>
    <dt>Installation</dt>
    <dd>Install from source:
        <ol>
            <li><b>./configure</b></li>
            <li><b>make</b></li>
            <li><b>make install</b></li>
        </ol>
    </dd>
    <dd><b>dpkg -i pkg.deb</b> - install a package (Debian)</dd>
    <dd><b>rpm -Uvh pkg.rpm</b> - install a package (PRM)</dd>
    <dt>Shortcuts</dt>
    <dd><b>Ctrl+C</b> - halts the current command</dd>
    <dd><b>Ctrl+Z</b> - stops the current, resume with fg in foreground or bg in the background</dd>
    <dd><b>Ctrl+D</b> - log out of current session, similar to exit</dd>
    <dd><b>Ctrl+W</b> - erases one word in the current line</dd>
    <dd><b>Ctrl+U</b> - erases th whole line</dd>
    <dd><b>Ctrl+R</b> - type to bring up a recent command</dd>
    <dd><b>!!</b> - repeats the last command</dd>
    <dd><b>exit</b> - log out of current session</dd>
</dl>