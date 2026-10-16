# Installation Notes

## FTK Imager on Kali Linux Using Wine

FTK Imager is a Windows forensic tool, so this lab used Wine to run it in a Kali Linux environment.

## Wine Setup

```bash
sudo dpkg --add-architecture i386
sudo apt update
sudo apt install wine64 wine32
```

## FTK Imager Installation

Run the FTK Imager installer through Wine:

```bash
wine setup.exe
```

Replace `setup.exe` with the actual FTK Imager installer filename.

## Launching FTK Imager

After installation, launch the executable through Wine:

```bash
wine "/path/to/FTK/FTK.exe"
```

Replace `/path/to/FTK/` with the actual installation path.

## Notes

- Use a disk image obtained legally for educational, training, or authorized investigation purposes.
- Keep the original evidence image unchanged.
- Export reports separately from the evidence source.

