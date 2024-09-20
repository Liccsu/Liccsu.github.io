import{_ as e,o as i,c as n,e as d}from"./app-C4bsKav7.js";const s={},a=d(`<blockquote><p>[!WARNING]</p><p>以下操作可能会导致包括但不仅限于数据丢失、无法启动等问题，严重时您可能需要重装系统，如要继续，请确保已做好数据备份等准备工作。</p></blockquote><h1 id="debian12根分区扩容记录" tabindex="-1"><a class="header-anchor" href="#debian12根分区扩容记录" aria-hidden="true">#</a> Debian12根分区扩容记录</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>情况是这样的，有一台Debian12的机器，磁盘分区信息如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# df -Th
Filesystem     Type      Size  Used Avail Use% Mounted on
udev           devtmpfs  3.8G     0  3.8G   0% /dev
tmpfs          tmpfs     775M  488K  775M   1% /run
/dev/vda1      ext4       19G  1.1G   17G   7% /
tmpfs          tmpfs     3.8G     0  3.8G   0% /dev/shm
tmpfs          tmpfs     5.0M     0  5.0M   0% /run/lock
tmpfs          tmpfs     775M     0  775M   0% /run/user/0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到根分区只有19G，但是呢现在有一块未使用的磁盘：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# lsblk
NAME              MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sr0                11:0    1  368K  0 rom  
vda               254:0    0   20G  0 disk 
├─vda1            254:1    0   19G  0 part /
├─vda2            254:2    0    1K  0 part 
└─vda5            254:5    0  975M  0 part [SWAP]
vdb               254:16   0   30G  0 disk 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这块未使用的磁盘有30G，现在想把这30G加到根分区上去，思路就是采用LVM逻辑卷管理动态扩容，建立一个逻辑卷组，把vda和vdb都加入此卷组，达到物理上是两块不同磁盘，但逻辑上合并为一块磁盘的效果。</p><h2 id="_1-将磁盘vdb初始化为物理卷" tabindex="-1"><a class="header-anchor" href="#_1-将磁盘vdb初始化为物理卷" aria-hidden="true">#</a> 1.将磁盘vdb初始化为物理卷</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# pvcreate /dev/vdb
  Physical volume &quot;/dev/vdb&quot; successfully created.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-新建卷组并将vdb加入此卷组" tabindex="-1"><a class="header-anchor" href="#_2-新建卷组并将vdb加入此卷组" aria-hidden="true">#</a> 2.新建卷组并将vdb加入此卷组</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# vgcreate vg_root /dev/vdb
  Volume group &quot;vg_root&quot; successfully created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-在卷组中创建逻辑卷" tabindex="-1"><a class="header-anchor" href="#_3-在卷组中创建逻辑卷" aria-hidden="true">#</a> 3.在卷组中创建逻辑卷</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# lvcreate -l 100%FREE -n lv_root vg_root
WARNING: ext4 signature detected on /dev/vg_root/lv_root at offset 1080. Wipe it? [y/n]: y
  Wiping ext4 signature on /dev/vg_root/lv_root.
  Logical volume &quot;lv_root&quot; created.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用<code>lsblk</code>命令查看vdb上已经创建了该逻辑卷：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# lsblk
NAME              MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sr0                11:0    1  368K  0 rom  
vda               254:0    0   20G  0 disk 
├─vda1            254:1    0   19G  0 part /
├─vda2            254:2    0    1K  0 part 
└─vda5            254:5    0  975M  0 part [SWAP]
vdb               254:16   0   30G  0 disk 
└─vg_root-lv_root 253:0    0   30G  0 lvm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用etx4文件系统格式化此逻辑卷" tabindex="-1"><a class="header-anchor" href="#_4-使用etx4文件系统格式化此逻辑卷" aria-hidden="true">#</a> 4.使用etx4文件系统格式化此逻辑卷</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# mkfs.ext4 /dev/vg_root/lv_root
mke2fs 1.47.0 (5-Feb-2023)
Creating filesystem with 7863296 4k blocks and 1966080 inodes
Filesystem UUID: 65808f9c-feec-4b53-a238-68afc9675bf2
Superblock backups stored on blocks: 
        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 
        4096000

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-修改-etc-fstab" tabindex="-1"><a class="header-anchor" href="#_5-修改-etc-fstab" aria-hidden="true">#</a> 5.修改<code>/etc/fstab</code></h2><p>首先使用<code>blkid</code>命令得到上面创建的逻辑卷的<strong>UUID</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# blkid
/dev/vdb: UUID=&quot;yidW91-cpxx-fByR-WkMU-qX0R-mLXI-4rG0w5&quot; TYPE=&quot;LVM2_member&quot;
/dev/sr0: BLOCK_SIZE=&quot;2048&quot; UUID=&quot;2024-03-28-20-15-38-00&quot; LABEL=&quot;cidata&quot; TYPE=&quot;iso9660&quot;
/dev/mapper/vg_root-lv_root: UUID=&quot;65808f9c-feec-4b53-a238-68afc9675bf2&quot; BLOCK_SIZE=&quot;4096&quot; TYPE=&quot;ext4&quot; # 这一项
/dev/vda5: UUID=&quot;63b700c5-f855-4754-a9ac-ce29e520ecf4&quot; TYPE=&quot;swap&quot; PARTUUID=&quot;1d6b09a9-05&quot;
/dev/vda1: UUID=&quot;1038e8c5-a0e6-4031-aab4-c664d0bcf637&quot; BLOCK_SIZE=&quot;4096&quot; TYPE=&quot;ext4&quot; PARTUUID=&quot;1d6b09a9-01&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例：</h3><p>原<code>/etc/fstab</code>内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># /etc/fstab: static file system information.
#
# Use &#39;blkid&#39; to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# systemd generates mount units based on this file, see systemd.mount(5).
# Please run &#39;systemctl daemon-reload&#39; after making changes here.
#
# &lt;file system&gt; &lt;mount point&gt;   &lt;type&gt;  &lt;options&gt;       &lt;dump&gt;  &lt;pass&gt;
# / was on /dev/vda1 during installation
UUID=1038e8c5-a0e6-4031-aab4-c664d0bcf637 /               ext4    errors=remount-ro 0       1
# swap was on /dev/vda5 during installation
UUID=63b700c5-f855-4754-a9ac-ce29e520ecf4 none            swap    sw              0       0
/dev/sr0        /media/cdrom0   udf,iso9660 user,noauto     0       0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>替换<code>/etc/fstab</code>中的根目录挂载项的UUID为上方逻辑卷的UUID，更改完成后如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># /etc/fstab: static file system information.
#
# Use &#39;blkid&#39; to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# systemd generates mount units based on this file, see systemd.mount(5).
# Please run &#39;systemctl daemon-reload&#39; after making changes here.
#
# &lt;file system&gt; &lt;mount point&gt;   &lt;type&gt;  &lt;options&gt;       &lt;dump&gt;  &lt;pass&gt;
# / was on /dev/vda1 during installation
UUID=65808f9c-feec-4b53-a238-68afc9675bf2 /               ext4    errors=remount-ro 0       1
# swap was on /dev/vda5 during installation
UUID=63b700c5-f855-4754-a9ac-ce29e520ecf4 none            swap    sw              0       0
/dev/sr0        /media/cdrom0   udf,iso9660 user,noauto     0       0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-挂载此逻辑卷并将原根目录同步到此卷" tabindex="-1"><a class="header-anchor" href="#_6-挂载此逻辑卷并将原根目录同步到此卷" aria-hidden="true">#</a> 6.挂载此逻辑卷并将原根目录同步到此卷</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# mount /dev/mapper/vg_root-lv_root /mnt
root@xxx:~# rsync -axHAWX --numeric-ids --info=progress2 / /mnt
  1,086,763,736  99%   51.43MB/s    0:00:20 (xfr#18943, to-chk=0/24170)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-绑定一些必要的系统目录和文件" tabindex="-1"><a class="header-anchor" href="#_7-绑定一些必要的系统目录和文件" aria-hidden="true">#</a> 7.绑定一些必要的系统目录和文件</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# mount --types proc /proc /mnt/proc
root@xxx:~# mount --rbind /sys /mnt/sys
root@xxx:~# mount --make-rslave /mnt/sys
root@xxx:~# mount --rbind /dev /mnt/dev
root@xxx:~# mount --make-rslave /mnt/dev
root@xxx:~# mount --rbind /run /mnt/run
root@xxx:~# mount --bind /etc/resolv.conf /mnt/etc/resolv.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-chroot到新的根目录并更新grub和initramfs" tabindex="-1"><a class="header-anchor" href="#_8-chroot到新的根目录并更新grub和initramfs" aria-hidden="true">#</a> 8.<code>chroot</code>到新的根目录并更新<code>grub</code>和<code>initramfs</code></h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# chroot /mnt
root@xxx:/# grub-install /dev/vda
Installing for i386-pc platform.
Installation finished. No error reported.
root@xxx:/# update-grub
Generating grub configuration file ...
Found linux image: /boot/vmlinuz-6.1.0-18-amd64
Found initrd image: /boot/initrd.img-6.1.0-18-amd64
Warning: os-prober will not be executed to detect other bootable partitions.
Systems on them will not be added to the GRUB boot configuration.
Check GRUB_DISABLE_OS_PROBER documentation entry.
done
root@xxx:/# update-initramfs -u -k all
update-initramfs: Generating /boot/initrd.img-6.1.0-18-amd64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-退出chroot并重启" tabindex="-1"><a class="header-anchor" href="#_9-退出chroot并重启" aria-hidden="true">#</a> 9.退出<code>chroot</code>并重启</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:/# exit
exit
root@xxx:~# umount -l /mnt/sys # 卸载之前的挂载点，下同
root@xxx:~# umount -l /mnt/proc
root@xxx:~# umount -l /mnt/dev
root@xxx:~# umount -l /mnt/run
root@xxx:~# reboot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10-扩容新的根分区" tabindex="-1"><a class="header-anchor" href="#_10-扩容新的根分区" aria-hidden="true">#</a> 10.扩容新的根分区</h2><p>重启完成之后，应该能看到上面新建的逻辑分区被挂载到了根目录：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# df -Th
Filesystem                  Type      Size  Used Avail Use% Mounted on
udev                        devtmpfs  3.8G     0  3.8G   0% /dev
tmpfs                       tmpfs     775M  8.5M  767M   2% /run
/dev/mapper/vg_root-lv_root ext4       30G  1.1G   27G   4% /
tmpfs                       tmpfs     3.8G     0  3.8G   0% /dev/shm
tmpfs                       tmpfs     5.0M     0  5.0M   0% /run/lock
tmpfs                       tmpfs     775M     0  775M   0% /run/user/0
root@xxx:~# lsblk
NAME              MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sr0                11:0    1  368K  0 rom  
vda               254:0    0   20G  0 disk 
├─vda1            254:1    0   19G  0 part 
├─vda2            254:2    0    1K  0 part 
└─vda5            254:5    0  975M  0 part 
vdb               254:16   0   30G  0 disk 
└─vg_root-lv_root 253:0    0   30G  0 lvm  /
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来把原根分区所在的vda1也加入卷组vg_root：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# pvcreate /dev/vda1
WARNING: ext4 signature detected on /dev/vda1 at offset 1080. Wipe it? [y/n]: y
  Wiping ext4 signature on /dev/vda1.
  Physical volume &quot;/dev/vda1&quot; successfully created.
root@xxx:~# vgextend vg_root /dev/vda1
  Volume group &quot;vg_root&quot; successfully extended
root@xxx:~# lvextend -l +100%FREE /dev/vg_root/lv_root
  Size of logical volume vg_root/lv_root changed from &lt;30.00 GiB (7679 extents) to &lt;49.04 GiB (12554 extents).
  Logical volume vg_root/lv_root successfully resized.
root@xxx:~# resize2fs /dev/vg_root/lv_root
resize2fs 1.47.0 (5-Feb-2023)
Filesystem at /dev/vg_root/lv_root is mounted on /; on-line resizing required
old_desc_blocks = 4, new_desc_blocks = 7
The filesystem on /dev/vg_root/lv_root is now 12855296 (4k) blocks long.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>：此时看一下<code>/etc/fstab</code>，确保和上面修改过的一致，再次执行：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>grub-install /dev/vda
update-grub
update-initramfs -u -k all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成之后再次重启，如果能正确引导且磁盘已扩容就大功告成：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# df -Th
Filesystem                  Type      Size  Used Avail Use% Mounted on
udev                        devtmpfs  3.8G     0  3.8G   0% /dev
tmpfs                       tmpfs     775M  500K  775M   1% /run
/dev/mapper/vg_root-lv_root ext4       49G  1.4G   45G   3% /
tmpfs                       tmpfs     3.8G     0  3.8G   0% /dev/shm
tmpfs                       tmpfs     5.0M     0  5.0M   0% /run/lock
tmpfs                       tmpfs     775M     0  775M   0% /run/user/0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_11-可能遇到的问题-解决方法" tabindex="-1"><a class="header-anchor" href="#_11-可能遇到的问题-解决方法" aria-hidden="true">#</a> 11.可能遇到的问题&amp;解决方法</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@xxx:~# pvcreate /dev/vdb
  Can&#39;t initialize physical volume &quot;/dev/vdb&quot; of volume group &quot;vg_root&quot; without -ff
  /dev/vdb: physical volume not initialized.
root@xxx:~# pvs
  WARNING: Couldn&#39;t find device with uuid BUVBX6-jfV5-cwDm-WVcM-YJdv-6oP7-peBjUu.
  WARNING: VG vg_root is missing PV BUVBX6-jfV5-cwDm-WVcM-YJdv-6oP7-peBjUu (last written to /dev/vda1).
  PV         VG      Fmt  Attr PSize   PFree
  /dev/vdb   vg_root lvm2 a--  &lt;30.00g    0 
  [unknown]  vg_root lvm2 a-m   19.04g    0 
root@xxx:~# lvs
  WARNING: Couldn&#39;t find device with uuid BUVBX6-jfV5-cwDm-WVcM-YJdv-6oP7-peBjUu.
  WARNING: VG vg_root is missing PV BUVBX6-jfV5-cwDm-WVcM-YJdv-6oP7-peBjUu (last written to /dev/vda1).
  LV      VG      Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  lv_root vg_root -wi-----p- &lt;49.04g                                                    
root@xxx:~# vgs
  WARNING: Couldn&#39;t find device with uuid BUVBX6-jfV5-cwDm-WVcM-YJdv-6oP7-peBjUu.
  WARNING: VG vg_root is missing PV BUVBX6-jfV5-cwDm-WVcM-YJdv-6oP7-peBjUu (last written to /dev/vda1).
  VG      #PV #LV #SN Attr   VSize   VFree
  vg_root   2   1   0 wz-pn- &lt;49.04g    0 
root@xxx:~# df -Th
Filesystem     Type      Size  Used Avail Use% Mounted on
udev           devtmpfs  3.8G     0  3.8G   0% /dev
tmpfs          tmpfs     775M  500K  775M   1% /run
/dev/vda1      ext4       19G  1.1G   17G   7% /
tmpfs          tmpfs     3.8G     0  3.8G   0% /dev/shm
tmpfs          tmpfs     5.0M     0  5.0M   0% /run/lock
tmpfs          tmpfs     775M     0  775M   0% /run/user/0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决方式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 确保当前根目录处于vda上
# 删除以上损坏的卷和卷组
vgchange -an vg_root # 禁用此卷组
vgreduce --removemissing vg_root # 删除卷组中的已丢失的卷
lvremove /dev/vg_root # 删除此卷组上的逻辑卷
vgremove vg_root # 删除此卷组
pvremove [--force --force] /dev/vdb # [强制]删除此物理卷（添加两个--force选项来强制删除）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,47),t=[a];function l(r,v){return i(),n("div",null,t)}const u=e(s,[["render",l],["__file","20240328-Debian12genfenqukuorongjilu.html.vue"]]);export{u as default};
